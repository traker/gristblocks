import React from "react";
import { createRoot } from "react-dom/client";
import exportedApplication from "./fixtures/maintenance-control.json";

type ComponentDefinition = { compType?: string; name?: string };
type ApplicationExport = {
  applicationName: string;
  applicationDSL: {
    ui: { layout: Record<string, unknown>; items: Record<string, ComponentDefinition> };
    hooks?: unknown[];
    settings?: Record<string, unknown>;
  };
};

const source = exportedApplication as ApplicationExport;
const dsl = source.applicationDSL;
const components = Object.entries(dsl.ui.items);
const counts = components.reduce<Record<string, number>>((acc, [, item]) => {
  const kind = item.compType ?? "unknown";
  acc[kind] = (acc[kind] ?? 0) + 1;
  return acc;
}, {});

function App() {
  return (
    <main style={{ fontFamily: "system-ui", maxWidth: 800, margin: "3rem auto", padding: 24 }}>
      <h1>GristBlocks — P1</h1>
      <p><strong>DSL chargé :</strong> {source.applicationName}</p>
      <p><strong>Composants :</strong> {components.length}</p>
      <ul>{Object.entries(counts).map(([kind, count]) =>
        <li key={kind}>{kind}: {count}</li>
      )}</ul>
      <p><strong>Disposition :</strong> {Object.keys(dsl.ui.layout).length} éléments</p>
      <p><strong>Hooks :</strong> {dsl.hooks?.length ?? 0}</p>
      <p style={{ padding: 12, background: "#fff3d6", borderRadius: 8 }}>
        Inspection du DSL uniquement. Le moteur de rendu Lowcoder n'est pas encore intégré :
        cette page ne valide ni le rendu Lowcoder ni l'autonomie réseau.
      </p>
      <details>
        <summary>Voir les premiers identifiants de composants</summary>
        <pre>{components.slice(0, 10).map(([id]) => id).join("\n")}</pre>
      </details>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
