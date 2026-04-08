/* 
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import { ReactNode, useEffect, useMemo, useState } from "react";
import { createContext, useContext } from "react";
import { darkTheme, lightTheme } from "../assets/Variables";

type ThemeMode = "light" | "dark";

type ThemeContextType = {
  themeMode: ThemeMode;
  toggleTheme: () => void;
} & typeof lightTheme;

const ThemeContext = createContext<ThemeContextType>({
  ...lightTheme,
  themeMode: "light",
  toggleTheme: () => undefined,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);
  }, [themeMode]);

  const value = useMemo(
    () => ({
      ...(themeMode === "dark" ? darkTheme : lightTheme),
      themeMode,
      toggleTheme: () =>
        setThemeMode((current) => (current === "light" ? "dark" : "light")),
    }),
    [themeMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
