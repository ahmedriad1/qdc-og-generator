import { isDev } from "@/utils/functions";

const exePath =
  process.platform === "win32"
    ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
    : process.platform === "linux"
    ? "/usr/bin/google-chrome"
    : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

interface Options {
  args: string[];
  executablePath: string;
  headless: boolean;
}

export async function getOptions() {
  let options: Options;
  if (isDev()) {
    options = {
      args: [],
      executablePath: exePath,
      headless: true,
    };
  } else {
    options = {
      args: ["--no-sandbox", "--font-render-hinting=none"],
      executablePath: "/usr/bin/chromium-browser",
      headless: true,
    };
  }

  return options;
}
