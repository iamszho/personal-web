"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function VantaBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    let effect: { destroy: () => void } | null = null;

    (async () => {
      // Vanta resolves THREE from window, not from the options object
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).THREE = THREE;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { default: DOTS } = await import("vanta/dist/vanta.dots.min" as any);
      effect = DOTS({
        el: ref.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x00d992,
        color2: 0x00d992,
        backgroundColor: 0x101010,
        size: 3.4,
        spacing: 32,
      });
    })();

    return () => {
      effect?.destroy();
    };
  }, []);

  return <div ref={ref} className="absolute inset-0 w-full h-full" />;
}
