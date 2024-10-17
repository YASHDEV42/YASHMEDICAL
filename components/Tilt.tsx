"use client";
import React, { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";

const Tilt = ({ options, children }: { options: any; children: any }) => {
  const tiltRef = useRef(null);

  useEffect(() => {
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, options as any);
    }

    // Cleanup function to destroy the tilt effect
    return () => tiltRef.current?.vanillaTilt.destroy();
  }, [options]);

  return (
    <div ref={tiltRef} className="tilt-root">
      <div className="tilt-child">{children}</div>
    </div>
  );
};

export default Tilt;
