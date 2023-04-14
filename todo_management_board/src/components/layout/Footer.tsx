import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Avatar from "../common/Avatar";

function Footer() {
  return (
    <footer className={`relative w-full h-[180px] mt-20 bg-dark-300`}>
      <div className="flex items-center h-full px-5">
        {/* <Avatar width="w-[130px]" height="h-[130px]" circular route="/" /> */}
        <div className="flex flex-col ml-10 pt-2">
          {/* <span className={`h-[50px]`}>Links</span> */}
          <span className={`h-[50px]`}>
            CopyRight Dániel Balogh & Dominik Klepe
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
