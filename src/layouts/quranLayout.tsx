import { OG_WIDTH } from "../constants";
import {
  GetCSSFn,
  ILayout,
  LayoutComponent,
  LayoutLoader,
  Verse,
} from "../types";
import { getFontFaceNameForPage, getV1OrV2FontFaceSource } from "../utils/font";
import humps from "humps";

const getCSS: GetCSSFn = async (_, verse: Verse) => {
  const isV1 = true;
  const fontFaceName = getFontFaceNameForPage(isV1, verse.pageNumber);
  // get font as base64
  const fontBase64 = await fetch(
    getV1OrV2FontFaceSource(isV1, verse.pageNumber),
  )
    .then(res => res.arrayBuffer())
    .then(buffer => Buffer.from(buffer).toString("base64"));

  return `
  @font-face {
    font-family: '${fontFaceName}';
    src: url(data:font/woff2;charset=utf-8;base64,${fontBase64}) format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }


  body {
    background-color: #22a5ad;
    background-image: url('https://quran.com/images/background.jpg');
    background-size: cover;
  }

    h1 {
      font-size: 90px;
      font-weight: 400;
      color: #fff;
    }

    p {
      color: #fff;
      font-family: inherit;
    }
  `;
};

const Component: LayoutComponent = ({ data }) => {
  const verse = data as Verse;
  const fontName = getFontFaceNameForPage(true, verse.pageNumber);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          // height: "100%",
          width: "100%",
          maxWidth: OG_WIDTH - 400 * 2,
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontFamily: fontName,
          }}
        >
          {verse.codeV1}
        </h1>

        {verse.translations && verse.translations[0] ? (
          <p
            style={{ marginTop: 150, fontSize: 30 }}
            dangerouslySetInnerHTML={{
              __html: verse.translations[0].text,
            }}
          />
        ) : null}

        <p style={{ marginTop: 30, fontSize: 20, color: "red" }}>
          quran.com/{verse.verseKey}
        </p>
      </div>
    </div>
  );
};

const loader: LayoutLoader = async config => {
  const key = config["Verse Key"];
  try {
    const data = await fetch(
      `https://api.quran.com/api/v4/verses/by_key/${key}?translations=149&fields=code_v1`,
    );
    if (data.status !== 200) throw new Error("Verse not found !");
    const { verse } = await data.json();
    return humps.camelizeKeys(verse);
  } catch {
    throw new Error("Something went wrong while fetching verse !");
  }
};

export const quranLayout: ILayout = {
  name: "Quran",
  properties: [
    {
      name: "Verse Key",
      type: "text",
      default: "2:9",
    },
  ],
  getCSS,
  Component,
  loader,
};
