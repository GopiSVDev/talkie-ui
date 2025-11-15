import { useEffect } from 'react';
import { useThemeStore } from '~/stores/ThemeStore';

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
  }, [theme]);

  return <>{children}</>;
};

export default ThemeWrapper;
