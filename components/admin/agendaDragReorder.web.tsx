import { forwardRef, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ScrollView, View, type ScrollViewProps, type View as RNView } from 'react-native';
import {
  AGENDA_SECTION_LONG_PRESS_MS,
  type AgendaSectionDragHandle,
} from '@/components/admin/agendaSectionDragTypes';
import { useAgendaDragScrollRef } from '@/components/admin/agendaDragScrollContext';

export const NestableScrollContainer = forwardRef<ScrollView, ScrollViewProps>(function NestableScrollContainer(
  props,
  ref,
) {
  return <ScrollView ref={ref} {...props} />;
});

export function ScaleDecorator({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

const DRAG_START_DELTA_PX = 10;
const SWAP_THROTTLE_MS = 60;
const SCROLL_EDGE_PX = 88;
const SCROLL_MAX_SPEED = 20;

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

function findScrollableParent(start: HTMLElement | null): HTMLElement | null {
  let node = start;
  while (node && node !== document.body) {
    if (node.scrollHeight > node.clientHeight + 2) {
      return node;
    }
    node = node.parentElement;
  }
  return (document.scrollingElement as HTMLElement | null) ?? document.documentElement;
}

function resolveScrollElement(
  rowNode: HTMLElement | null,
  scrollViewRef: ReturnType<typeof useAgendaDragScrollRef>,
): HTMLElement | null {
  const scrollView = scrollViewRef?.current;
  if (scrollView) {
    const node = (
      scrollView as ScrollView & { getScrollableNode?: () => HTMLElement }
    ).getScrollableNode?.();
    if (node && node.scrollHeight > node.clientHeight + 2) return node;
  }
  return findScrollableParent(rowNode);
}

function getDomRect(node: RNView | null | undefined): DOMRect | null {
  const el = node as unknown as HTMLElement | null;
  return el?.getBoundingClientRect?.() ?? null;
}

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
  const lastPointerYRef = useRef(0);
  const lastSwapAtRef = useRef(0);
  const scrollParentRef = useRef<HTMLElement | null>(null);
  const autoScrollRafRef = useRef<number | null>(null);
  const detachWindowListeners = useRef<(() => void) | null>(null);
  const agendaScrollRef = useAgendaDragScrollRef();

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

  const stopAutoScroll = useCallback(() => {
    if (autoScrollRafRef.current != null) {
      cancelAnimationFrame(autoScrollRafRef.current);
      autoScrollRafRef.current = null;
    }
    scrollParentRef.current = null;
  }, []);

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

  const autoScrollForPointer = useCallback((clientY: number) => {
    const scroller = scrollParentRef.current;
    if (!scroller) return;
    const rect = scroller.getBoundingClientRect();
    if (clientY < rect.top + SCROLL_EDGE_PX) {
      scroller.scrollTop -= SCROLL_MAX_SPEED;
    } else if (clientY > rect.bottom - SCROLL_EDGE_PX) {
      scroller.scrollTop += SCROLL_MAX_SPEED;
    }
  }, []);

  const startAutoScrollLoop = useCallback(() => {
    const tick = () => {
      if (!draggingIdRef.current) {
        autoScrollRafRef.current = null;
        return;
      }
      autoScrollForPointer(lastPointerYRef.current);
      autoScrollRafRef.current = requestAnimationFrame(tick);
    };
    if (autoScrollRafRef.current != null) cancelAnimationFrame(autoScrollRafRef.current);
    autoScrollRafRef.current = requestAnimationFrame(tick);
  }, [autoScrollForPointer]);

  const finishInteraction = useCallback(
    (notifyParent: boolean) => {
      detachListeners();
      stopAutoScroll();
      const wasDragging = draggingIdRef.current != null;
      resetInteractionState();
      setInteractionEpoch((n) => n + 1);
      if (notifyParent && wasDragging) {
        onDragEnd({ data: itemsRef.current });
      }
    },
    [detachListeners, onDragEnd, resetInteractionState, stopAutoScroll],
  );

  const pointerY = (e: MouseEvent | TouchEvent) =>
    'touches' in e && e.touches.length > 0 ? e.touches[0].clientY : (e as MouseEvent).clientY;

  /** Swap one step toward pointer — works reliably for both up and down. */
  const moveDraggedItemTowardPointer = useCallback(
    (id: string, clientY: number) => {
      const now = Date.now();
      if (now - lastSwapAtRef.current < SWAP_THROTTLE_MS) return;

      const list = itemsRef.current;
      const from = list.findIndex((row) => keyExtractor(row) === id);
      if (from < 0) return;

      if (from > 0) {
        const prevId = keyExtractor(list[from - 1]);
        const prevRect = getDomRect(rowRefs.current.get(prevId));
        if (prevRect && clientY < prevRect.top + prevRect.height * 0.5) {
          lastSwapAtRef.current = now;
          setItems((prev) => {
            const next = [...prev];
            [next[from - 1], next[from]] = [next[from], next[from - 1]];
            return next;
          });
          return;
        }
      }

      if (from < list.length - 1) {
        const nextId = keyExtractor(list[from + 1]);
        const nextRect = getDomRect(rowRefs.current.get(nextId));
        if (nextRect && clientY > nextRect.top + nextRect.height * 0.5) {
          lastSwapAtRef.current = now;
          setItems((prev) => {
            const next = [...prev];
            [next[from], next[from + 1]] = [next[from + 1], next[from]];
            return next;
          });
        }
      }
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

      const rowNode = rowRefs.current.get(id) as unknown as HTMLElement | null;
      scrollParentRef.current = resolveScrollElement(rowNode, agendaScrollRef);
      startAutoScrollLoop();

      const onPointerMove = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        const y = pointerY(e);
        lastPointerYRef.current = y;
        autoScrollForPointer(y);
        moveDraggedItemTowardPointer(id, y);
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
    [
      detachListeners,
      finishInteraction,
      keyExtractor,
      moveDraggedItemTowardPointer,
      autoScrollForPointer,
      startAutoScrollLoop,
      agendaScrollRef,
    ],
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
      lastPointerYRef.current = startY;
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
      stopAutoScroll();
      clearArmTimer();
    },
    [detachListeners, stopAutoScroll],
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
        ref={agendaScrollRef ?? undefined}
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
