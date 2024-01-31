import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router.jsx";
import { SharedContext } from "./SharedContext.jsx";
import { Provider } from "react-redux";
import store from "./Store/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <SharedContext> */}
      <RouterProvider router={router} />
    {/* </SharedContext> */}
  </Provider>
);
