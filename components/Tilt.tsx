"use client";
import React, { useEffect, useRef } from "react";
import VanillaTiltfrom "vanilla-tilt";
import { TiltOptions } from "vanilla-tilt";

interface TiltProps {
  options: TiltOptions | undefined;
  children: React.ReactNode;
}

const Tilt = ({ options, children }: TiltProps) => {
  const tiltRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tiltElement = tiltRef.current;
    if (tiltElement) {
      VanillaTilt.init(tiltElement, options);
    }

    return () => {
      if (tiltElement?.vanillaTilt) {
        tiltElement.vanillaTilt.destroy();
      }
    };
  }, [options]);

  return (
    <div ref={tiltRef} className="tilt-root">
      <div className="tilt-child">{children}</div>
    </div>
  );
};

export default Tilt;
