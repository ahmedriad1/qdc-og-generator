import { useLayoutConfig } from "@/hooks/useLayoutConfig";
import { ILayout, ILayoutProperty } from "@/types";
import { Field, Label } from "./Field";
import { Input } from "./Input";
import { Select } from "./Select";
import clsx from "clsx";

export interface Props {
  layout: ILayout;
}

export const LayoutOptions: React.FC<Props> = ({ layout }) => {
  return (
    <div className={clsx(`layout-${layout.name}`, "space-y-4")}>
      {layout.properties.map(p => (
        <LayoutProperty key={p.name} property={p} />
      ))}
    </div>
  );
};

const LayoutProperty: React.FC<{
  property: ILayoutProperty;
}> = ({ property: p }) => {
  const [layoutConfig, setLayoutConfig] = useLayoutConfig();

  return (
    <Field>
      <Label>{p.name}</Label>

      <div className="w-full">
        {p.type === "text" ? (
          <Input
            placeholder={p.placeholder ?? `Value for ${p.name}`}
            value={layoutConfig[p.name] ?? ""}
            onChange={e => setLayoutConfig({ [p.name]: e.target.value })}
          />
        ) : p.type === "number" ? (
          <Input
            placeholder={p.placeholder ?? `Value for ${p.name}`}
            value={layoutConfig[p.name] ?? ""}
            type="number"
            onChange={e => setLayoutConfig({ [p.name]: e.target.value })}
          />
        ) : p.type === "select" ? (
          <Select
            options={p.options.map(value => ({ value }))}
            value={layoutConfig[p.name] ?? ""}
            onChange={value => setLayoutConfig({ [p.name]: value })}
          />
        ) : null}

        {p.description != null && (
          <span className="text-gray-400 text-xs leading-4">
            {p.description}
          </span>
        )}
      </div>
    </Field>
  );
};
