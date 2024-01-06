export type PageProps = Record<string, unknown>;

declare global {
  namespace Vike {
    interface PageContext {
      Page: (props: PageProps) => React.ReactElement;
      pageProps?: PageProps;
      urlPathname: string;
      exports: {
        documentProps?: {
          title?: string;
        };
      };
    }
  }
}
