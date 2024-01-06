import { StrictMode } from "react";
import type { PageContext } from "vike/types";
import { PageContextProvider } from "./PageContext";
import "./index.css";

type PageShellProps = {
  children: React.ReactNode;
  pageContext: PageContext;
};

export const PageShell: React.FC<PageShellProps> = ({
  children,
  pageContext,
}) => (
  <StrictMode>
    <PageContextProvider pageContext={pageContext}>
      {children}
    </PageContextProvider>
  </StrictMode>
);
