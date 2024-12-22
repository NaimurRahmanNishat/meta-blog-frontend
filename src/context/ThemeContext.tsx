import { createContext } from "react";
interface ThemeContextType {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}
export const ThemeContext = createContext<ThemeContextType | null>(null);
