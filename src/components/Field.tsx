import clsx from "clsx";

export const Field = props => (
  <div {...props} className={clsx("flex items-center", props.className)} />
);

export const Label = props => (
  <label {...props} className={clsx("w-32 mr-4", props.className)} />
);
