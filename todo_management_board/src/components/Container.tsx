import React from "react";

interface Props {
  className?: string;
  width?: string | any;
  height?: string | any;
  children: React.ReactNode;
  padding?: string;
}

function Container({
  className,
  width,
  height,
  children,
  padding = " p-6",
}: Props) {
  return (
    <div className={`${className} ${width} ${height} ${padding}`}>
      {children}
    </div>
  );
}

export default Container;
