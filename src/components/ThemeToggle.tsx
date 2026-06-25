import type { ThemeMode } from '../types/themeMode'
import styles from '../styles/components/ThemeToggle.module.css'

interface Props {
    theme: 'light' | 'dark'
    onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: Props) {
    const isDark = theme === 'dark'

    return (
        <button
            className={styles.button}
            onClick={onToggle}

            aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
        >
            {isDark ? '☀️ Claro' : '🌙 Oscuro'}
        </button>
    )
}