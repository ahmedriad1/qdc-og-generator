import { NextApiRequest } from "next";
import { defaultConfig } from "@/hooks/useConfig";
import { getLayoutConfigFromQuery } from "@/layouts";
import { IConfig, ILayoutConfig } from "@/types";

export const parseRequest = (req: NextApiRequest): IConfig & ILayoutConfig => {
  const config: IConfig = {
    ...defaultConfig,
    ...req.query,
  };

  const layoutConfig = getLayoutConfigFromQuery(config.layout, req.query);

  return {
    ...config,
    ...layoutConfig,
  };
};
