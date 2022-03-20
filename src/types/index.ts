export type FileType = "png" | "jpeg";

export interface IConfig {
  format: FileType;
  layout: string;
}

export type LayoutLoader = (config: ILayoutConfig & IConfig) => Promise<any>;

export interface ILayout {
  name: string;
  properties: ILayoutProperty[];
  getCSS?: GetCSSFn;
  Component?: LayoutComponent;
  loader?: LayoutLoader;
}

export type LayoutComponent = React.ComponentType<{
  config: IConfig & ILayoutConfig;
  data?: any;
}>;

export type GetCSSFn = (
  c: ILayoutConfig & IConfig,
  data?: any,
) => Promise<string>;

export type ILayoutProperty = BaseLayoutProperty &
  (
    | {
        type: "text";
        default?: string;
        placeholder?: string;
      }
    | {
        type: "number";
        default?: string;
        placeholder?: string;
      }
    | {
        type: "select";
        options: string[];
        default?: string;
      }
  );

export interface BaseLayoutProperty {
  name: string;
  description?: string;
}

export type ILayoutValue = string;
export type ILayoutConfig = Record<string, ILayoutValue>;

export enum QuranFont {
  MadaniV1 = "code_v1",
  MadaniV2 = "code_v2",
  Uthmani = "text_uthmani",
}

export type { Verse } from "./Verse";
