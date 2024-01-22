import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router.jsx";
import { SharedContext } from "./Home/SharedContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SharedContext>
      <RouterProvider router={router} />
    </SharedContext>
  </React.StrictMode>
);
