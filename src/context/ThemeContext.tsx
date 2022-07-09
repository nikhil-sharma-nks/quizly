import { createContext, useContext, useState, useEffect } from 'react';
import { ReactChildrenType } from '../types';
type ThemeContextType = {
  theme: string;
  toggleTheme: any;
};
const ThemeContext = createContext({} as ThemeContextType);
const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }: ReactChildrenType) => {
  const [theme, setTheme] = useState('');
  const toggleTheme = () =>
    setTheme((t) => {
      localStorage.setItem('theme', t === 'light' ? 'dark' : 'light');
      return t === 'light' ? 'dark' : 'light';
    });
  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
      localStorage.setItem('theme', currentTheme);
      setTheme(currentTheme);
    } else {
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    }
  }, []);
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, useTheme };
