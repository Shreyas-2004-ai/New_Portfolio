import { useState } from "react";
import Home from "./Pages/Home";
import AbyssBootSequence from "./Components/Loader/AbyssBootSequence";

function App() {
  const [hasBooted, setHasBooted] = useState(false);

  return (
    <>
      {/* Home is always mounted so it's ready when loader finishes */}
      <Home />

      {/* Loader overlays on top until complete */}
      {!hasBooted && (
        <AbyssBootSequence onComplete={() => setHasBooted(true)} />
      )}
    </>
  );
}

export default App;