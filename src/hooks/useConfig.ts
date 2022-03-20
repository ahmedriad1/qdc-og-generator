import { createLocalStorageStateHook } from "use-local-storage-state";
import { layouts } from "../layouts";
import { IConfig } from "../types";

export const defaultConfig: IConfig = {
  format: "png",
  layout: layouts[0].name,
};

export const useConfig = createLocalStorageStateHook<IConfig>(
  "config",
  defaultConfig,
);
