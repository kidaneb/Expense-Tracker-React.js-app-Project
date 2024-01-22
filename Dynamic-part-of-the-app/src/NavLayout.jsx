import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { NavBar } from "./NavBar";
import { useContext } from "react";
import { MyContext } from "./Home/SharedContext";

export function NavLayout() {
  return (
    <>
      <div className="container">
        <div className="modal"></div>
        <Header />
        <div className="detail-container">
          <NavBar />
          <div className="transaction-container">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
