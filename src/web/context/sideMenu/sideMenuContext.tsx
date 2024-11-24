import { createContext, useContext, useState } from "react";

interface ISideMenuContext {
  currentActive: string;
  setCurrentActive: React.Dispatch<React.SetStateAction<TCurrentActive>>;
}
interface ISideMenuContextProvider {
  children: React.ReactNode;
}
type TCurrentActive = "download" | "addCover" | "settings";

const SideMenuContext = createContext({} as ISideMenuContext);
export const useSideMenuContext = () => {
  return useContext(SideMenuContext);
}

export const SideMenuContextProvider: React.FC<ISideMenuContextProvider> = ({ children }) => {
  const [currentActive, setCurrentActive] = useState<TCurrentActive>("download");

  return (
    <SideMenuContext.Provider
      value={{
        currentActive,
        setCurrentActive,
      }}>
      {children}
    </SideMenuContext.Provider>
  );
}