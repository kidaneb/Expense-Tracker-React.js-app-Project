import { useState } from "react";
import { Home } from "./Home/Home";
import { NavBar } from "./NavBar";
import { Header } from "./Header";

function App() {
  return (
    <>
      <div className="container">
        <Header />
        <div className="detail-container">
          <NavBar />
          <div className="transaction-container">
            <Home />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
