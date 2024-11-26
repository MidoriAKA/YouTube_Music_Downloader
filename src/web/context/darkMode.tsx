import { createContext, useContext, useState } from "react";

interface IDarkModeContext {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}
interface IDarkModeContextProvider {
  children: React.ReactNode;
}
const DarkModeContext = createContext({} as IDarkModeContext);
export const useDarkModeContext = () => {
  return useContext(DarkModeContext);
}
export const DarkModeContextProvider: React.FC<IDarkModeContextProvider> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <DarkModeContext.Provider
      value={{
        darkMode,
        setDarkMode,
      }}>
      {children}
    </DarkModeContext.Provider>
  );
}