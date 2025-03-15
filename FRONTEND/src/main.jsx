import React, { StrictMode } from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App";
const Root = ReactDOM.createRoot(document.getElementById("root"));
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
Root.render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
