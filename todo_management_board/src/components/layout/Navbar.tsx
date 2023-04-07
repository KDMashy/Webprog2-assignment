import React, { useEffect, useRef, useState } from "react";
import Button from "../common/Button";
import { navButtons } from "@/constants/NavButtons";

function Navbar() {
  const MenuButtons = () => {
    return navButtons.map((button, index) => {
      return <Button key={index} label={button?.label} route={button?.url} />;
    });
  };

  return <header className={`flex justify-between`}></header>;
}

export default Navbar;
