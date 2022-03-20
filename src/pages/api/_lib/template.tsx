import { layouts } from "@/layouts";
import ReactDOMServer from "react-dom/server";
import { IConfig, ILayoutConfig, LayoutComponent } from "@/types";
import { readFileSync } from "fs";
import path from "path";

const suraNames = readFileSync(
  path.resolve("src/pages/api/_fonts", "sura_names.woff2"),
).toString("base64");

const getCommonCSS = () => {
  return `
    @font-face {
      font-family: "surahnames";
      src: url(data:font/woff2;charset=utf-8;base64,${suraNames})
        format("woff2");
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }

    body {
      background: white;
      color: black;
      background-size: 100px 100px;
      height: 100vh;
      display: flex;
      text-align: center;
      align-items: center;
      justify-content: center;
      font-family: "Montserrat", sans-serif;
      font-weight: 400;
      font-size: 100px;
      margin: 0;
      padding: 0;
    }
  `;
};

const ErrorMessage = ({ children }) => (
  <h1 style={{ fontSize: 100 }}>{children}</h1>
);

const NotImplemented: LayoutComponent = ({ config }) => (
  <ErrorMessage>{config.layout} not implemented</ErrorMessage>
);

export const withBaseHtml = (html: string, extraCss?: string) => {
  return `<!DOCTYPE html>
  <html>
    <meta charset="utf-8" />
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      ${getCommonCSS()}
      ${extraCss || ""}
    </style>
    <body>
      ${html}
    </body>
  </html>`;
};

export const getHtml = async (config: IConfig & ILayoutConfig) => {
  const layout = layouts.find(l => l.name === config.layout);
  if (!layout || !layout.Component)
    return withBaseHtml(
      ReactDOMServer.renderToString(<NotImplemented config={config} />),
    );

  let data = undefined;
  try {
    if (layout.loader) data = await layout.loader(config);
    const rendered = ReactDOMServer.renderToString(
      <layout.Component config={config} data={data} />,
    );

    return withBaseHtml(
      rendered,
      layout?.getCSS != null ? await layout.getCSS(config, data) : "",
    );
  } catch (e: any) {
    const msg = e.message || "An error occured";
    return withBaseHtml(
      ReactDOMServer.renderToString(<ErrorMessage>{msg}</ErrorMessage>),
    );
  }
};
