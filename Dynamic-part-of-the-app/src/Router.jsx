import { createBrowserRouter } from "react-router-dom";
import { Home } from "./Home/Home";
import { Expense } from "./Expense/Expense";
import { Category } from "./Category/Category";
import { Budget } from "./Budget/Budget";
import { SharedContext } from "./Home/SharedContext";
import { NavLayout } from "./NavLayout";

export const router = createBrowserRouter([
  {
    element: (
      <SharedContext>
        <NavLayout />
      </SharedContext>
    ),
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
      {
        path: "/expense",
        element: (
          <SharedContext>
            <Expense />
          </SharedContext>
        ),
      },
      {
        path: "/category",
        element: (
          <SharedContext>
            <Category />
          </SharedContext>
        ),
      },
    ],
  },
]);
