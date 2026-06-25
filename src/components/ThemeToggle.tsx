import styles from "../styles/components/ThemeToggle.module.css";
import { BsSunFill, BsMoonFill } from "react-icons/bs";

import type { ThemeMode } from "../types/themeMode";

interface Props {
  theme: ThemeMode;
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: Props) {
  const isDark = theme === "dark";

  return (
    <button
      className={`${styles.button} ${
        isDark ? styles.darkMode : styles.lightMode
      }`}
      onClick={onToggle}
      aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
    >
      <BsSunFill
        className={`${styles.icon} ${isDark ? styles.active : styles.inactive}`}
      />

      <BsMoonFill
        className={`${styles.icon} ${
          !isDark ? styles.active : styles.inactive
        }`}
      />
    </button>
  );
}
