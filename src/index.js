import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Context, { FirebaseContext } from "./Store/Context";
import { fireBase } from "./firebase/config"; // Update the import statement

ReactDOM.render(
  <FirebaseContext.Provider value={{ fireBase }}>
    <Context>
      <App />
    </Context>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
