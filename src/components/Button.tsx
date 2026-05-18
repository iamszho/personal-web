"use client";

import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

// Ahora cada variante define 3 capas: el contenedor base, el slider animado, y el texto.
const variants: Record<Variant, { button: string; slider: string; text: string }> = {
  primary: {
    // Fondo verde.
    button: "bg-primary border border-primary",
    // Se desliza un fondo oscuro.
    slider: "bg-canvas",
    // El texto pasa de oscuro a verde brillante.
    text: "text-canvas group-hover:text-primary",
  },
  outline: {
    // Fondo oscuro con borde sutil.
    button: "bg-canvas border border-hairline",
    // Se desliza el fondo verde.
    slider: "bg-primary",
    // El texto pasa de blanco a oscuro.
    text: "text-ink group-hover:text-canvas",
  },
  ghost: {
    // Sin fondo.
    button: "bg-transparent",
    // Se desliza un gris súper sutil.
    slider: "bg-canvas-soft",
    // El texto pasa de un verde suave a un verde intenso.
    text: "text-primary-soft group-hover:text-primary",
  },
};

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        group relative overflow-hidden inline-flex items-center justify-center
        px-4 py-3 rounded-none
        cursor-pointer
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant].button}
        ${className}
      `}
      {...props}
    >
      <div
        className={`
          absolute inset-0 transition-transform duration-300 ease-in-out
          origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100
          ${variants[variant].slider}
        `}
      />
      <span
        className={`
          relative z-10 block transition-colors duration-300
          font-semibold text-base leading-6
          ${variants[variant].text}
        `}
      >
        {children}
      </span>
    </button>
  );
}