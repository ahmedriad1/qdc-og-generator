import { isDev } from "@/utils/functions";
import { NextApiHandler } from "next";
import { getScreenshot } from "./_lib/chromium";
import { parseRequest } from "./_lib/parser";
import { getHtml } from "./_lib/template";

const handler: NextApiHandler = async (req, res) => {
  try {
    const config = parseRequest(req);
    console.log("\n\n--- /api/image");
    console.log("CONFIG", config);

    const html = await getHtml(config);
    const { format } = config;
    const file = await getScreenshot(html, format);
    res.statusCode = 200;
    res.setHeader("Content-Type", `image/${format}`);
    // disable cache for dev enviroment
    if (!isDev())
      res.setHeader(
        "Cache-Control",
        `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`,
      );

    res.end(file);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Internal Error</h1><p>Sorry, there was a problem</p>");
    console.error(e);
  }
};

export default handler;
