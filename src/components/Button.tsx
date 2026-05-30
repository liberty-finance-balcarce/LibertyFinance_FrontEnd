import { NavLink } from "react-router-dom";
import styles from "../styles/components/Button.module.css";

interface ButtonProps {
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "default" | "login" | "logo" | "test" | "register" | "contact";
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

export function Button({
  to,
  onClick,
  children,
  variant = "default",
  type = "button",
  className,
  disabled = false,
}: ButtonProps) {
  let baseClass = styles.button;
  let activeClass = styles.buttonActive;

  if (variant === "login") {
    baseClass = styles.buttonLogin;
    activeClass = styles.buttonLoginActive;
  } else if (variant === "logo") {
    baseClass = styles.buttonLogo;
    activeClass = styles.buttonLogoActive;
  } else if (variant === "test") {
    baseClass = styles.buttonTest;
    activeClass = styles.buttonTestActive;
  } else if (variant === "register") {
    baseClass = styles.buttonRegister;
    activeClass = styles.buttonRegisterActive;
  } else if (variant === "contact") {
    baseClass = styles.buttonContact;
    activeClass = styles.buttonContactActive;
  }

  if (to) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? `${baseClass} ${activeClass} ${className || ""}`
            : `${baseClass} ${className || ""}`
        }
      >
        {children}
      </NavLink>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClass} ${className || ""}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
