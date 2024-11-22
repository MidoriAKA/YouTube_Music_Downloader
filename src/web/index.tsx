import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";
import { SideMenuContextProvider } from "./context/sideMenu/sideMenuContext";

createRoot(document.getElementById("root") as Element).render(
  <StrictMode>
    <SideMenuContextProvider>
      <App />
    </SideMenuContextProvider>
  </StrictMode>,
);
