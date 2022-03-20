import { ILayoutConfig } from "../types";
import { defaultTheme } from "./colours";

export const gString = (
  layoutConfig: ILayoutConfig,
  name: string,
  defaultValue: string = "",
): string => {
  const value = layoutConfig[name] ?? defaultValue;
  return Array.isArray(value) ? value.join(", ") : value;
};

export const getTheme = (config: ILayoutConfig) => {
  return (config.Theme ?? defaultTheme).toLowerCase();
};

export const Logo: React.FC<{
  style?: React.CSSProperties;
}> = ({ style }) => {
  const logo = "https://mizmar.ar1.dev/icons/apple-touch-icon.png";

  return (
    <img
      src={logo}
      className="rlogo"
      style={{ width: 200, height: 200, ...style }}
    />
  );
};
