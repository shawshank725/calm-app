// theme/useThemedStyles.ts
/*
import { useThemeContext } from './ThemeContext';
import { ThemeOverrides } from './themeOverrides';
import { CommonStyles } from './types';

export function useThemedStyles(screenName: string, baseStyles: Record<string, any>) {
  const { theme, role } = useThemeContext(); // assumes you have ThemeContext setup
  const override = ThemeOverrides?.[role]?.[theme]?.[screenName] || {};

  const merged = Object.keys(baseStyles).reduce((acc, key) => {
    acc[key] = [baseStyles[key], override[key] || {}];
    return acc;
  }, {} as Record<string, any>);

  return merged;
}
*/