import { QuranFont } from "../types";

const CDN_HOST = "https://static.qurancdn.com";
const CDN_ASSETS_VERSION = "1";

const makeCDNUrl = (path: string) =>
  `${CDN_HOST}/${path}?v=${CDN_ASSETS_VERSION}`;

const QCFFontCodes = [QuranFont.MadaniV1, QuranFont.MadaniV2];
export const isQCFFont = (font: QuranFont) => QCFFontCodes.includes(font);

export const getV1OrV2FontFaceSource = (
  isV1: boolean,
  pageNumber: number,
): string => {
  if (isV1) {
    const woff2 = makeCDNUrl(`fonts/quran/hafs/v1/woff2/p${pageNumber}.woff2`);
    return woff2;
  }

  const woff2 = makeCDNUrl(`fonts/quran/hafs/v2/woff2/p${pageNumber}.woff2`);
  return woff2;
};

export const getFontFaceNameForPage = (
  isV1: boolean,
  pageNumber: number,
): string => (isV1 ? `p${pageNumber}-v1` : `p${pageNumber}-v2`);
