import Link from "next/link";
import React from "react";

interface Props {
  label?: string;
  color?:
    | "primary"
    | "secondary"
    | "disabled"
    | "succes"
    | "error"
    | "warning"
    | "switch"
    | "alternative";
  clickHandler?: any;
  className?: string;
  circular?: boolean;
  icon?: any;
  route?: string;
  loading?: boolean;
  disabled?: boolean;
  target?: "_blank" | "_self" | "_parent" | "_top";
  clickType?: "button" | "submit";
  padding?: string;
}

function Button({
  label,
  color = "primary",
  clickHandler,
  className = "",
  circular,
  icon,
  route,
  loading = false,
  disabled = false,
  target = "_self",
  clickType = "button",
  padding = "md:px-3 md:py-3",
}: Props) {
  const colorize = () => {
    switch (color) {
      case "primary":
        return `bg-light-400 text-light-700`;
      case "secondary":
        return `bg-dark-600 text-light-200`;
      case "succes":
        return `bg-success-300 text-light-100`;
      case "warning":
        return `bg-warning-300 text-light-100`;
      case "error":
        return `bg-error-500 text-light-100`;
      case "disabled":
        return `bg-dark-700 text-light-300`;
      case "alternative":
        return `"bg-light-300`;
      case "switch":
        return `bg-dark-300`;
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (e?.button !== 0) {
      return false;
    }

    clickHandler(e);
  };

  const ButtonRender = () => {
    return (
      <button
        className={`${icon || circular ? "p-0.5" : "py-3 px-5"}
         ${className} ${colorize()} ${
          circular
            ? circular && label
              ? "rounded-md"
              : "rounded-full"
            : "rounded-md"
        } transition ease-in-out delay-150 hover:bg-opacity-50 hover:text-light-200 text-center`}
        onMouseDown={clickHandler && handleClick}
        disabled={disabled || loading}
        type={clickType}
      >
        {label}

        {icon ? icon : <></>}
      </button>
    );
  };

  return route ? (
    <Link href={route} target={target}>
      {ButtonRender()}
    </Link>
  ) : (
    <>{ButtonRender()}</>
  );
}

export default Button;
