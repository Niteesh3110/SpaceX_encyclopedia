"use client";

import { useEffect } from "react";
import { ParallaxProvider } from "react-scroll-parallax";

export default function ClientLayout({ children }) {
  useEffect(() => {
    document.title = "SpaceX Encyclopedia";
  }, []);
  return <ParallaxProvider>{children}</ParallaxProvider>;
}
