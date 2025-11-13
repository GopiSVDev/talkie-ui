import { useEffect } from 'react';
import { useTheme } from '~/contexts/ThemeContext';

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme.id);
  }, [theme]);

  return <>{children}</>;
};

export default ThemeWrapper;
