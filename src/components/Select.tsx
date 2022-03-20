import { forwardRef } from "react";

export interface Option {
  value: string;
  text?: string;
  disabled?: boolean;
}

export interface Props {
  options: Option[];
  value?: string;
  width?: string;
  name?: string;
  error?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  onChange?: (value: string) => void;
}

export const Select = forwardRef<HTMLSelectElement, Props>(
  (
    { value, options, name, error, disabled, autoFocus, onChange, ...rest },
    forwardedRef,
  ) => {
    return (
      <select
        ref={forwardedRef}
        value={value}
        disabled={disabled}
        autoFocus={autoFocus}
        name={name}
        className={
          "block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        }
        {...rest}
        onChange={e => {
          if (onChange != null) {
            onChange(e.target.value);
          }
        }}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.text ?? opt.value}
          </option>
        ))}
      </select>
    );
  },
);
