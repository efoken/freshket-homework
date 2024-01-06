import { hydrateRoot } from "react-dom/client";
import type { OnRenderClientAsync } from "vike/types";
import { PageShell } from "./PageShell";

export const onRenderClient: OnRenderClientAsync = async (
  pageContext
): ReturnType<OnRenderClientAsync> => {
  const { Page, pageProps, data } = pageContext;

  if (!Page) {
    throw new Error(
      "Client-side render() hook expects pageContext.Page to be defined."
    );
  }

  hydrateRoot(
    document.getElementById("root")!,
    <PageShell pageContext={pageContext}>
      <Page data={data} {...pageProps} />
    </PageShell>
  );
};
