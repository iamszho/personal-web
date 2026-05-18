import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-[#00d992] text-[#101010] font-semibold text-base leading-6 hover:opacity-90 active:opacity-80",
  outline:
    "bg-[#101010] text-[#f2f2f2] border border-[#3d3a39] font-semibold text-base leading-6 hover:border-[#f2f2f2]/30 active:opacity-80",
  ghost:
    "bg-transparent text-[#2fd6a1] font-semibold text-base leading-6 hover:text-[#00d992] active:opacity-80",
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
        inline-flex items-center justify-center
        px-4 py-3
        rounded-none
        cursor-pointer transition-all duration-150
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00d992]
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
