import { useState } from "react";
import Home from "./Pages/Home";
import AbyssBootSequence from "./Components/Loader/AbyssBootSequence";
import { ErrorBoundary } from "./ErrorBoundary";

function App() {
  const [hasBooted, setHasBooted] = useState(false);

  return (
    <ErrorBoundary>
      <Home />
      {!hasBooted && (
        <AbyssBootSequence onComplete={() => setHasBooted(true)} />
      )}
    </ErrorBoundary>
  );
}

export default App;