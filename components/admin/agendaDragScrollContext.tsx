import { createContext, useContext, type RefObject } from 'react';
import type { ScrollView } from 'react-native';

export const AgendaDragScrollContext = createContext<RefObject<ScrollView | null> | null>(null);

export function useAgendaDragScrollRef() {
  return useContext(AgendaDragScrollContext);
}
