import { ILayoutConfig } from "../types";

export const gString = (
  layoutConfig: ILayoutConfig,
  name: string,
  defaultValue: string = "",
): string => {
  const value = layoutConfig[name] ?? defaultValue;
  return Array.isArray(value) ? value.join(", ") : value;
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
