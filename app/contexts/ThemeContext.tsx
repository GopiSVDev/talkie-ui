import { createContext, useContext, useState } from 'react';

export interface Theme {
  id: string;
  name: string;
}

const defaultThemes: Theme[] = [
  { id: 'light', name: 'Light' },
  { id: 'dark', name: 'Dark' },
];

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  availableThemes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  initialTheme = defaultThemes[0],
}: {
  children: React.ReactNode;
  initialTheme?: Theme;
}) {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, availableThemes: defaultThemes }}
    >
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
