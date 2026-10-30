import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

import type { AvailabilityFilter } from './catalog';

type CatalogState = { search: string; category: string; availability: AvailabilityFilter };
const initialCatalog: CatalogState = { search: '', category: 'Todas', availability: 'Todas' };
function useSessionState() {
  const [catalog, setCatalog] = useState(initialCatalog);
  const scrollPositions = useRef<Record<string, number>>({});
  const getScrollPosition = useCallback((id: string) => scrollPositions.current[id] ?? 0, []);
  const setScrollPosition = useCallback((id: string, y: number) => {
    scrollPositions.current[id] = y;
  }, []);
  return { catalog, setCatalog, getScrollPosition, setScrollPosition };
}
const PreviewSession = createContext<ReturnType<typeof useSessionState> | null>(null);
export function PreviewSessionProvider({ children }: PropsWithChildren) {
  return <PreviewSession.Provider value={useSessionState()}>{children}</PreviewSession.Provider>;
}
export function usePreviewSession() {
  const session = useContext(PreviewSession);
  if (!session) throw new Error('PreviewSessionProvider is required');
  return session;
}
