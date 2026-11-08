import React from "react";
import { createRoot } from "react-dom/client";
import { LowcoderAppView } from "./appView/LowcoderAppView";
import maintenanceControl from "./gristblocks-maintenance.json";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Élément #root introuvable");
}

createRoot(root).render(
  <LowcoderAppView
    appId="gristblocks-maintenance"
    appDsl={maintenanceControl.applicationDSL}
  />
);
