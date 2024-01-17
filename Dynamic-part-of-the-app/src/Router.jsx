import { Outlet, createBrowserRouter } from "react-router-dom";
import { Home } from "./Home/Home";
import { Expense } from "./Expense/Expense";
import { Category } from "./Category/Category";
import { Budget } from "./Budget/Budget";
import { NavBar } from "./NavBar";
import { Header } from "./Header";
import { SharedContext } from "./Home/SharedContext";

export const router = createBrowserRouter([
  {
    element: <NavLayout />,
    children: [
      {
        path: "/",
        element: (
          <SharedContext>
            <Home />
          </SharedContext>
        ),
      },
      {
        path: "/budget",
        element: (
          <SharedContext>
            <Budget />
          </SharedContext>
        ),
      },
      { path: "/expense", element: <Expense /> },
      { path: "/category", element: <Category /> },
    ],
  },
]);

function NavLayout() {
  return (
    <>
      <div className="container">
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
