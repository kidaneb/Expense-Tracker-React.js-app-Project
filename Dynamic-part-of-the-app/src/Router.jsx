import { createBrowserRouter } from "react-router-dom";
import { Home } from "./Home/Home";
import { Expense } from "./Expense/Expense";
import { Category } from "./Category/Category";
import { Budget } from "./Budget/Budget";
import { NavLayout } from "./NavLayout";
// import { Menu } from "./Menu";

export const router = createBrowserRouter([
  {
    element: <NavLayout />,
    children: [
      // {
      //   path:"/menu",
      //   element:<Menu/>
      // },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/budget",
        element: <Budget />,
      },
      {
        path: "/expense",
        element: <Expense />,
      },
      {
        path: "/category",
        element: <Category />,
      },
    ],
  },
]);
