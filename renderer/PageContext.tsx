import { createContext, useContext } from "react";
import type { PageContext } from "vike/types";

const Context = createContext<PageContext>(undefined as unknown as PageContext);

type PageContextProviderProps = {
  children: React.ReactNode;
  pageContext: PageContext;
};

export const PageContextProvider: React.FC<PageContextProviderProps> = ({
  children,
  pageContext,
}) => <Context.Provider value={pageContext}>{children}</Context.Provider>;

export function usePageContext() {
  return useContext(Context);
}
