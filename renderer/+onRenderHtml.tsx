import { renderToString } from "react-dom/server";
import { dangerouslySkipEscape, escapeInject } from "vike/server";
import type { OnRenderHtmlAsync } from "vike/types";
import { PageShell } from "./PageShell";
import reactUrl from "./react.svg";

export const onRenderHtml: OnRenderHtmlAsync = async (
  pageContext
): ReturnType<OnRenderHtmlAsync> => {
  const { Page, pageProps, exports, data } = pageContext;

  if (!Page) {
    throw new Error(
      "The render() hook expects pageContext.Page to be defined."
    );
  }

  const pageHtml = renderToString(
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} data={data} />
    </PageShell>
  );

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="${reactUrl}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${exports.documentProps?.title || "Card Display"}</title>
      </head>
      <body>
        <div id="root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {},
  };
};
