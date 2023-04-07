import React, { useState } from "react";

interface Props {
  className?: string;
  onClick?: any;
  ref?: any;
  id?: any;
  defaultValue?: string;
  maxLength?: any;
  minLength?: any;
  value?: string | number | any;
  type?:
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
  name?: string;
  checked?: boolean;
  onChange?: any;
  disabled?: boolean;
  placeholder?: string;
  specialType?: "select" | "checkbox" | null;
  options?: any | any[];
  label?: string;
  labelClass?: string;
  error?: string | number | boolean | any;
  touched?: boolean;
  textArea?: boolean;
}

export const CustomInput = ({
  className,
  onClick,
  ref,
  id,
  defaultValue,
  maxLength,
  minLength,
  value,
  type = "text",
  name,
  checked,
  onChange,
  disabled,
  placeholder,
  specialType,
  options,
  label,
  labelClass = "text-dark-300",
  error,
  touched,
  textArea,
}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [val, setVal] = useState(value);

  const shownValue = () => {
    if (specialType === "checkbox") {
      let valueText = [];
      for (let i = 0; i < options.length; i++) {
        const element = options[i];
        if (element?.selected) {
          valueText.push(element.label);
        }
      }

      return valueText.join(", ");
    }
    if (specialType === "select") {
      return value;
    }

    return value;
  };

  return (
    <div className="flex flex-col">
      <label className={`${labelClass}`}>{label}</label>
      {!textArea ? (
        <input
          type={type}
          className={`${
            type !== "checkbox" ? "h-[50px]" : "h-[25px]"
          } pl-3 text-dark-300 ${className} overflow-hidden border-2 rounded-xl`}
          onClick={specialType ? () => setShowModal(!showModal) : onClick}
          ref={ref}
          id={id}
          defaultValue={defaultValue}
          maxLength={maxLength}
          minLength={minLength}
          value={shownValue()}
          name={name}
          checked={checked}
          onChange={
            onChange ? (e) => onChange(e) : (e) => setVal(e.target.value)
          }
          disabled={disabled}
          placeholder={placeholder}
        />
      ) : (
        <textarea
          ref={ref}
          id={id}
          className={`pl-3 ${className} overflow-hidden border-2 rounded-xl`}
          defaultValue={defaultValue}
          maxLength={maxLength}
          minLength={minLength}
          value={shownValue()}
          name={name}
          onChange={
            onChange ? (e) => onChange(e) : (e) => setVal(e.target.value)
          }
          disabled={disabled}
          placeholder={placeholder}
        ></textarea>
      )}
      {error && touched ? (
        <p className="text-error-300 text-base px-3 pt-1 pb-2">{error}</p>
      ) : (
        <></>
      )}
    </div>
  );
};
