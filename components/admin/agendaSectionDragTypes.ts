export type AgendaSectionDragHandle = {
  drag: () => void;
  isActive: boolean;
  isPressing: boolean;
  isReady: boolean;
  onDragPressIn: (clientY?: number) => void;
  onDragPressOut: () => void;
  onDragLongPress?: () => void;
};

export const AGENDA_SECTION_LONG_PRESS_MS = 420;
