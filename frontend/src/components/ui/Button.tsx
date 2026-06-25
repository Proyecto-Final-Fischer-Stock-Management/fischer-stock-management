import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";

type ButtonVariant = "primary" | "secondary" | "ghost" | "link" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

interface ButtonImageProps {
  imageSrc: string;
  altText: string;
}

type ButtonLinkProps = LinkProps & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "border border-blue-600 bg-blue-600 text-white hover:bg-blue-700 rounded-md",
  secondary:
    "border border-gray-300 bg-white text-gray-900 shadow-sm hover:bg-gray-50",
  ghost:
    "border border-transparent bg-transparent text-gray-900 hover:bg-gray-100",
  link: "border border-transparent bg-transparent text-blue-600 hover:underline",
  danger: "border border-red-600 bg-red-600 text-white hover:bg-red-700",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-base",
};

const baseClasses =
  "inline-flex items-center justify-center transition-colors disabled:cursor-not-allowed disabled:opacity-50";

function getButtonClasses({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}) {
  return [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={getButtonClasses({ variant, size, fullWidth, className })}
      {...props}
    >
      {children}
    </button>
  );
}

export const ButtonImage: React.FC<ButtonImageProps> = ({ imageSrc, altText }) => {
  const handleClick = () => {
    // Aquí irá tu lógica de navegación más adelante (ej. con react-router-dom o un link simple)
    console.log("Navegando a la otra página...");
  };

  return (
    <button
      onClick={handleClick}
      className="
        group
        relative
        overflow-hidden
        rounded-lg
        border-2
        border-transparent
        p-0
        transition-all
        duration-200
        focus:outline-none
        hover:border-white
        focus:border-white
        active:scale-95
      "
    >
      <img 
        src={imageSrc} 
        alt={altText} 
        className="h-auto w-full max-w-[200px] object-cover"
      />
    </button>
  );
};

export function ButtonLink({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={getButtonClasses({ variant, size, fullWidth, className })}
      {...props}
    >
      {children}
    </Link>
  );
}
