"use client";

import { useEffect } from "react";

export default function SnapScroll() {
  useEffect(() => {
    const el = document.documentElement;
    el.style.scrollSnapType = "y mandatory";
    return () => {
      el.style.scrollSnapType = "";
    };
  }, []);

  return null;
}
