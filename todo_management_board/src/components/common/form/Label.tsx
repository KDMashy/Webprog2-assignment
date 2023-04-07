import React from "react";

function Label({
  labelClass,
  label,
  id,
}: {
  labelClass?: string;
  label?: string;
  id?: string | number | any;
}) {
  return (
    <div>
      <label className={`${labelClass}`} htmlFor={id}>
        {label}
      </label>
    </div>
  );
}

export default Label;
