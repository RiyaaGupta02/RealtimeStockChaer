import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

//to work online more proffeciently using serviceWOrker its completely optional to use it or not
serviceWorker.unregister();
