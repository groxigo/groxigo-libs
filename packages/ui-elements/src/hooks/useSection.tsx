import { useContext, createContext, ReactNode } from 'react';

export type Section = 'groceries' | 'recipes' | 'default';

const SectionContext = createContext<Section>('default');

export interface SectionProviderProps {
  section: Section;
  children: ReactNode;
}

export function SectionProvider({ section, children }: SectionProviderProps) {
  return (
    <SectionContext.Provider value={section}>
      {children}
    </SectionContext.Provider>
  );
}

export function useSection(): Section {
  return useContext(SectionContext);
}

