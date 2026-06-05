import { useState } from "react";

import Home from "./Pages/Home";

import AbyssBootSequence from "./Components/Loader/AbyssBootSequence";

function App() {
  const [hasBooted, setHasBooted] = useState(false);

  return (
    <>
      {!hasBooted ? (
        <AbyssBootSequence
          onComplete={() => setHasBooted(true)}
        />
      ) : (
        <Home />
      )}
    </>
  );
}

export default App;