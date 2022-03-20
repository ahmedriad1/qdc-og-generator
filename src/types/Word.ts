import { Translation } from "./Translation";

export enum CharType {
  Word = "word",
  End = "end",
  Pause = "pause",
  Sajdah = "sajdah",
  RubElHizb = "rub-el-hizb",
}

export interface Word {
  verseKey?: string;
  charTypeName: CharType;
  codeV1?: string;
  codeV2?: string;
  pageNumber?: number;
  hizbNumber?: number;
  lineNumber?: number;
  position: number;
  location?: string;
  translation?: Translation;
  id?: number;
  textUthmani?: string;
  textIndopak?: string;
  highlight?: string | boolean;
  text?: string;
  audioUrl: any;
  [key: string]: any;
}
