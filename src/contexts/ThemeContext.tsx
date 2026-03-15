import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type ThemeColor = string;

interface ThemeContextType {
    themeColor: ThemeColor;
    setThemeColor: (color: ThemeColor) => void;
    availableColors: { name: string; value: string }[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const DEFAULT_THEME_COLOR = '#FF5E97'; // Default pink color

const AVAILABLE_COLORS = [
    { name: 'Pink', value: '#FF5E97' },
    { name: 'Purple', value: '#9B72FA' },
    { name: 'Blue', value: '#5AC2FF' },
    { name: 'Yellow', value: '#FFD13B' },
    { name: 'Orange', value: '#F97316' },
    { name: 'Green', value: '#10B981' },
    { name: 'Cyan', value: '#06B6D4' },
    { name: 'Lime', value: '#84CC16' },
    { name: 'Sunflower', value: '#F39C12' },
    { name: 'Wisteria', value: '#8E44AD' },
    { name: 'Peterriver', value: '#3498DB' },
];

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [themeColor, setThemeColorState] = useState<ThemeColor>(DEFAULT_THEME_COLOR);

    useEffect(() => {
        // Load theme color from localStorage on mount
        const savedColor = localStorage.getItem('themeColor');
        if (savedColor) {
            setThemeColorState(savedColor);
        }
    }, []);

    const setThemeColor = (color: ThemeColor) => {
        setThemeColorState(color);
        localStorage.setItem('themeColor', color);

        // Update CSS variable
        document.documentElement.style.setProperty('--c-pink', color);

        // Calculate and update light variant
        const lightColor = adjustColorBrightness(color, 40);
        document.documentElement.style.setProperty('--c-pink-light', lightColor);
    };

    // Initialize CSS variables on mount
    useEffect(() => {
        document.documentElement.style.setProperty('--c-pink', themeColor);
        const lightColor = adjustColorBrightness(themeColor, 40);
        document.documentElement.style.setProperty('--c-pink-light', lightColor);
    }, [themeColor]);

    return (
        <ThemeContext.Provider value={{ themeColor, setThemeColor, availableColors: AVAILABLE_COLORS }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

// Helper function to adjust color brightness
function adjustColorBrightness(hex: string, percent: number): string {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
}
