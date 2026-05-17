import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ScrollView, View, type ScrollViewProps, type View as RNView } from 'react-native';
import {
  AGENDA_SECTION_LONG_PRESS_MS,
  type AgendaSectionDragHandle,
} from '@/components/admin/agendaSectionDragTypes';

export const NestableScrollContainer = ScrollView;

export function ScaleDecorator({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

const DRAG_START_DELTA_PX = 10;
const SWAP_THROTTLE_MS = 90;

export type AgendaDragRenderInfo<T> = {
  item: T;
  getIndex: () => number;
} & AgendaSectionDragHandle;

type DragListProps<T> = {
  data: T[];
  keyExtractor: (item: T) => string;
  renderItem: (info: AgendaDragRenderInfo<T>) => ReactNode;
  onDragEnd: (info: { data: T[] }) => void;
  style?: ScrollViewProps['style'];
  contentContainerStyle?: ScrollViewProps['contentContainerStyle'];
  showsVerticalScrollIndicator?: boolean;
  keyboardShouldPersistTaps?: ScrollViewProps['keyboardShouldPersistTaps'];
};

function WebPointerDragList<T>({
  data,
  keyExtractor,
  renderItem,
  onDragEnd,
  style,
  contentContainerStyle,
  showsVerticalScrollIndicator,
  keyboardShouldPersistTaps,
  asScrollView = false,
}: DragListProps<T> & { asScrollView?: boolean }) {
  const [items, setItems] = useState(data);
  const [pressingId, setPressingId] = useState<string | null>(null);
  const [readyId, setReadyId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [interactionEpoch, setInteractionEpoch] = useState(0);
  const readyIdRef = useRef<string | null>(null);
  const draggingIdRef = useRef<string | null>(null);
  const itemsRef = useRef(items);
  const rowRefs = useRef<Map<string, RNView | null>>(new Map());
  const armTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pressStartYRef = useRef(0);
  const lastSwapAtRef = useRef(0);
  const detachWindowListeners = useRef<(() => void) | null>(null);

  useEffect(() => {
    setItems(data);
  }, [data]);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    readyIdRef.current = readyId;
  }, [readyId]);

  useEffect(() => {
    draggingIdRef.current = draggingId;
  }, [draggingId]);

  const clearArmTimer = () => {
    if (armTimerRef.current) {
      clearTimeout(armTimerRef.current);
      armTimerRef.current = null;
    }
  };

  const detachListeners = useCallback(() => {
    detachWindowListeners.current?.();
    detachWindowListeners.current = null;
  }, []);

  const resetInteractionState = useCallback(() => {
    clearArmTimer();
    readyIdRef.current = null;
    draggingIdRef.current = null;
    setPressingId(null);
    setReadyId(null);
    setDraggingId(null);
  }, []);

  const finishInteraction = useCallback(
    (notifyParent: boolean) => {
      detachListeners();
      const wasDragging = draggingIdRef.current != null;
      resetInteractionState();
      setInteractionEpoch((n) => n + 1);
      if (notifyParent && wasDragging) {
        onDragEnd({ data: itemsRef.current });
      }
    },
    [detachListeners, onDragEnd, resetInteractionState],
  );

  const resolveHoverIndex = useCallback(
    (clientY: number) => {
      const list = itemsRef.current;
      for (let i = 0; i < list.length; i++) {
        const node = rowRefs.current.get(keyExtractor(list[i])) as unknown as HTMLElement | null;
        const rect = node?.getBoundingClientRect?.();
        if (!rect) continue;
        const mid = rect.top + rect.height / 2;
        if (clientY < mid) return i;
      }
      return Math.max(0, list.length - 1);
    },
    [keyExtractor],
  );

  const pointerY = (e: MouseEvent | TouchEvent) =>
    'touches' in e && e.touches.length > 0 ? e.touches[0].clientY : (e as MouseEvent).clientY;

  const swapDraggingItemToIndex = useCallback(
    (id: string, hoverIndex: number) => {
      const now = Date.now();
      if (now - lastSwapAtRef.current < SWAP_THROTTLE_MS) return;
      setItems((prev) => {
        const from = prev.findIndex((row) => keyExtractor(row) === id);
        if (from < 0 || from === hoverIndex) return prev;
        lastSwapAtRef.current = now;
        const next = [...prev];
        const [removed] = next.splice(from, 1);
        next.splice(hoverIndex, 0, removed);
        return next;
      });
    },
    [keyExtractor],
  );

  const beginDragging = useCallback(
    (item: T) => {
      if (draggingIdRef.current) return;

      detachListeners();
      const id = keyExtractor(item);
      draggingIdRef.current = id;
      readyIdRef.current = null;
      setDraggingId(id);
      setPressingId(null);
      setReadyId(null);

      const onPointerMove = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        swapDraggingItemToIndex(id, resolveHoverIndex(pointerY(e)));
      };

      const onPointerEnd = () => {
        finishInteraction(true);
      };

      const moveOpts: AddEventListenerOptions = { passive: false };
      window.addEventListener('mousemove', onPointerMove);
      window.addEventListener('mouseup', onPointerEnd);
      window.addEventListener('touchmove', onPointerMove, moveOpts);
      window.addEventListener('touchend', onPointerEnd);
      window.addEventListener('touchcancel', onPointerEnd);

      detachWindowListeners.current = () => {
        window.removeEventListener('mousemove', onPointerMove);
        window.removeEventListener('mouseup', onPointerEnd);
        window.removeEventListener('touchmove', onPointerMove);
        window.removeEventListener('touchend', onPointerEnd);
        window.removeEventListener('touchcancel', onPointerEnd);
      };
    },
    [detachListeners, finishInteraction, keyExtractor, resolveHoverIndex, swapDraggingItemToIndex],
  );

  const attachArmListeners = useCallback(
    (item: T) => {
      detachListeners();
      const id = keyExtractor(item);

      const onPointerMove = (e: MouseEvent | TouchEvent) => {
        if (draggingIdRef.current) return;
        const y = pointerY(e);
        if (readyIdRef.current === id && Math.abs(y - pressStartYRef.current) >= DRAG_START_DELTA_PX) {
          e.preventDefault();
          beginDragging(item);
        }
      };

      const onPointerEnd = () => {
        if (draggingIdRef.current) return;
        finishInteraction(false);
      };

      const moveOpts: AddEventListenerOptions = { passive: false };
      window.addEventListener('mousemove', onPointerMove);
      window.addEventListener('mouseup', onPointerEnd);
      window.addEventListener('touchmove', onPointerMove, moveOpts);
      window.addEventListener('touchend', onPointerEnd);
      window.addEventListener('touchcancel', onPointerEnd);

      detachWindowListeners.current = () => {
        window.removeEventListener('mousemove', onPointerMove);
        window.removeEventListener('mouseup', onPointerEnd);
        window.removeEventListener('touchmove', onPointerMove);
        window.removeEventListener('touchend', onPointerEnd);
        window.removeEventListener('touchcancel', onPointerEnd);
      };
    },
    [beginDragging, detachListeners, finishInteraction, keyExtractor],
  );

  const onDragPressIn = useCallback(
    (item: T, startY: number) => {
      if (draggingIdRef.current) return;

      const id = keyExtractor(item);
      detachListeners();
      resetInteractionState();
      pressStartYRef.current = startY;
      setPressingId(id);
      attachArmListeners(item);

      armTimerRef.current = setTimeout(() => {
        readyIdRef.current = id;
        setReadyId(id);
      }, AGENDA_SECTION_LONG_PRESS_MS);
    },
    [attachArmListeners, detachListeners, keyExtractor, resetInteractionState],
  );

  const onDragPressOut = useCallback(() => {
    if (draggingIdRef.current) return;
    finishInteraction(false);
  }, [finishInteraction]);

  useEffect(
    () => () => {
      detachListeners();
      clearArmTimer();
    },
    [detachListeners],
  );

  const rows = items.map((item) => {
    const id = keyExtractor(item);
    const isPressing = pressingId === id;
    const isReady = readyId === id && draggingId !== id;
    const isActive = draggingId === id;

    return (
      <View
        key={`${id}-${interactionEpoch}`}
        ref={(node) => {
          rowRefs.current.set(id, node);
        }}
      >
        {renderItem({
          item,
          drag: () => beginDragging(item),
          isActive,
          isPressing,
          isReady,
          getIndex: () => items.findIndex((row) => keyExtractor(row) === id),
          onDragPressIn: (clientY = 0) => onDragPressIn(item, clientY),
          onDragPressOut,
        })}
      </View>
    );
  });

  if (asScrollView) {
    return (
      <ScrollView
        style={style}
        contentContainerStyle={contentContainerStyle}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      >
        {rows}
      </ScrollView>
    );
  }

  return <View>{rows}</View>;
}

export function NestableDraggableFlatList<T>(props: DragListProps<T>) {
  return <WebPointerDragList {...props} asScrollView={false} />;
}

export function DraggableFlatList<T>(props: DragListProps<T>) {
  return <WebPointerDragList {...props} asScrollView={true} />;
}

export const agendaDragReorderSupported = true;
