import React, { useState, useEffect } from "react";
import './Header.scss';
import HeaderMobile from "./HeaderMobile";
import HeaderDesktop from "./HeaderDesktop";

const Header = () => {
  const isMobile = useIsMobile();
  return (
    <header>
      {isMobile ? <HeaderMobile /> : <HeaderDesktop />}
    </header>
  );
}


const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleMobileResize = () => {
      const mobile = typeof window === undefined ? false : window.innerWidth <= 768;
      setIsMobile(mobile);
    }

    handleMobileResize();
    window.addEventListener("resize", handleMobileResize);

    return () => {
      window.removeEventListener("resize", handleMobileResize);
    }
  }, []);
  return isMobile;
}

export default Header;
