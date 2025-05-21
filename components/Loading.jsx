import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const Loading = () => {
  return (
    <DotLottieReact
      src="/animation_loading.lottie"
      loop
      autoplay
      className="bg-black h-screen w-screen"
    />
  );
};
