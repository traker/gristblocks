import React from "react";
import { createRoot } from "react-dom/client";

// Banc d'essai uniquement : le moteur Lowcoder n'est PAS encore intégré.
// Ne pas présenter cet écran comme une validation du Runtime.
function App() {
  return (
    <main style={{ fontFamily: "system-ui", maxWidth: 760, margin: "4rem auto", padding: 20 }}>
      <h1>GristBlocks — P1</h1>
      <p>Environnement de test prêt pour l'intégration du Runtime Lowcoder.</p>
      <p>Étape suivante : brancher AppViewInstance avec un DSL réel exporté de Lowcoder.</p>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
