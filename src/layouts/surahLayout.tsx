import { GetCSSFn, ILayout, LayoutComponent, LayoutLoader } from "../types";

const getCSS: GetCSSFn = async () => {
  return `
  body {
    background-color: #22a5ad;
    background-image: url('https://quran.com/images/background.jpg');
    background-size: cover;
  }

    h1 {
      font-size: 300px;
      font-family: surahnames;
      color: white;
    }
  `;
};

const Component: LayoutComponent = ({ config }) => {
  const surah = config.Surah;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>{surah.padStart(3, "0")}</h1>
    </div>
  );
};

const loader: LayoutLoader = async config => {
  const surah = config["Surah"];
  if (!surah || !Number(surah)) throw new Error("Invalid surah");

  const parsed = Number(surah);
  if (parsed <= 0 || parsed > 114) throw new Error("Invalid surah");

  return;
};

export const surahLayout: ILayout = {
  name: "Surah",
  properties: [
    {
      name: "Surah",
      type: "select",
      options: new Array(114).fill(0).map((_, i) => (i + 1).toString()),
      default: "1",
    },
  ],
  getCSS,
  Component,
  loader,
};
