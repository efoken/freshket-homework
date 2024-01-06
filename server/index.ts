import compression from "compression";
import express from "express";
import { renderPage } from "vike/server";

const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";

const app = express();

app.use(compression());

if (process.env.NODE_ENV === "production") {
  const sirv = (await import("sirv")).default;
  app.use(base, sirv("./dist/client", { extensions: [] }));
} else {
  const { createServer } = await import("vite");
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });
  app.use(vite.middlewares);
}

app.use("*", async (req, res, next) => {
  const { httpResponse } = await renderPage({
    urlOriginal: req.originalUrl,
  });
  if (!httpResponse) {
    return next();
  } else {
    const { body, statusCode, headers, earlyHints } = httpResponse;
    res.writeEarlyHints?.({ link: earlyHints.map((e) => e.earlyHintLink) });
    headers.forEach(([name, value]) => res.setHeader(name, value));
    res.status(statusCode);
    res.send(body);
  }
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
