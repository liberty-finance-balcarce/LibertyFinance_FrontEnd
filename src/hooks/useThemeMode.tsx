import { useState, useEffect } from "react"
import type { ThemeMode } from "../types/themeMode"

function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
}

export function useThemeMode() {

const [theme, setTheme] = useState<ThemeMode>(() => {
        const temaGuardado = localStorage.getItem('cambioTema') as ThemeMode | null;
        return temaGuardado ? temaGuardado : getSystemTheme();
    });
    

    useEffect(() => {
        console.log(theme);
        
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark')
        }
    localStorage.setItem('cambioTema', theme);    
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevState) => prevState === 'light' ? 'dark' : 'light')
    }

    return { theme, toggleTheme }

}