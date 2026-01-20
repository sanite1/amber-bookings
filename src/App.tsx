import React from "react";

import { RoutesWrapper } from "./routes/Wrapper";
import PreloadWrapper from "./routes/PreloadWrapper";

const App: React.FC = () => {
  return (
    <PreloadWrapper>
      <RoutesWrapper />
    </PreloadWrapper>
  );
};

export default App;
