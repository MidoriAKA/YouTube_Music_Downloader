import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";
import { SideMenuContextProvider } from "./context/sideMenu/sideMenuContext";
import { SettingsContextProvider } from "./context/settings";

createRoot(document.getElementById("root") as Element).render(
  <>
    <SideMenuContextProvider>
      <SettingsContextProvider>
        <App />
      </SettingsContextProvider>
    </SideMenuContextProvider>
  </>,
);
