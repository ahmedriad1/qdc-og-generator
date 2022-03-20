import core from "puppeteer-core";
import { OG_HEIGHT, OG_WIDTH } from "@/constants";
import { FileType } from "@/types";
import { getOptions } from "./options";

// test
async function getPage() {
  const options = await getOptions();
  const browser = await core.launch(options);
  return await browser.newPage();
}

export async function getScreenshot(html: string, type: FileType) {
  const page = await getPage();

  await page.setViewport({ width: OG_WIDTH, height: OG_HEIGHT });
  await page.setContent(html);
  const file = await page.screenshot({ type });

  page.close();

  return file;
}
