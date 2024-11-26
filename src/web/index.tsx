import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";
import { SideMenuContextProvider } from "./context/sideMenu/sideMenuContext";
import { DarkModeContextProvider } from "./context/darkMode";

createRoot(document.getElementById("root") as Element).render(
  <StrictMode>
    <SideMenuContextProvider>
      <DarkModeContextProvider>
        <App />
      </DarkModeContextProvider>
    </SideMenuContextProvider>
  </StrictMode>,
);
