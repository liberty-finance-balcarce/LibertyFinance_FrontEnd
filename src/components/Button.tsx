import { NavLink } from "react-router-dom";
import styles from "../styles/components/Button.module.css";

interface ButtonProps {
  to: string;
  children: React.ReactNode;
  variant?: "default" | "login" | "logo";
}

export function Button({ to, children, variant = "default" }: ButtonProps) {
  let baseClass = styles.button;
  let activeClass = styles.buttonActive;

  if (variant === "login") {
    baseClass = styles.buttonLogin;
    activeClass = styles.buttonLoginActive;
  } else if (variant === "logo") {
    baseClass = styles.buttonLogo;
    activeClass = styles.buttonLogoActive;
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? `${baseClass} ${activeClass}` : baseClass
      }
    >
      {children}
    </NavLink>
  );
}
