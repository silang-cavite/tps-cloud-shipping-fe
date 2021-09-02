import React, { useState } from "react";
import { ContextAPI } from "./Middleware/Context";
import Routes from "./Routes/Routes";

function App() {
  // eslint-disable-next-line
    const [auth, setAuth] = useState(false);
    
    return (
      <React.Fragment>
        <ContextAPI.Provider value={{ auth, setAuth }}>
          <Routes />
        </ContextAPI.Provider>
      </React.Fragment>
    );
}

export default App;
