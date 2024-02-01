import { useContext, useRef, useState } from "react";
import { MyContext } from "../SharedContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addToSpendingArray } from "../Features/spendingCategoryArray";
import { addToInfoArray } from "../Features/InfoArray";
import { addToExpenseArray } from "../Features/expenseItemsArray";
import { expenseNotReset, expenseReset } from "../Features/isExpenseReset";

export function Expense() {
  const infoArray = useSelector((state) => state.infoArray.value);

  const expenseItemsArray = useSelector((state) => state.expenseArray.value);
  const spendingCategoryArray = useSelector(
    (state) => state.spendingArray.value
  );
  const addExpenseLableRef = useRef(null);
  const [addExpense, setAddExpense] = useState("");
  const addExpenseCategoryRef = useRef(null);
  const isexpenseReset = useSelector((state) => state.isExpenseReset.value);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  function addExpenseSubmit(e) {
    e.preventDefault();
    if (addExpenseLableRef.current.value === "" || addExpense === "") {
      return;
    }
    const newId = crypto.randomUUID();
    //add element to the infoArray
    dispatch(
      addToInfoArray({
        label: addExpenseLableRef.current.value,
        type: "Expense",
        amount: addExpense,
        category: addExpenseCategoryRef.current.value,
        date: new Date().toISOString().split("T")[0],
        id: newId,
      })
    );
    // add element to spendingItemsArray
    dispatch(
      addToSpendingArray({
        label: addExpenseLableRef.current.value,
        type: "Expense",
        amount: addExpense,
        category: addExpenseCategoryRef.current.value,
        date: new Date().toISOString().split("T")[0],
        id: newId,
      })
    );
    // add element to the expenseItemsArray
    dispatch(
      addToExpenseArray({
        label: addExpenseLableRef.current.value,
        type: "Expense",
        amount: addExpense,
        category: addExpenseCategoryRef.current.value,
        date: new Date().toISOString().split("T")[0],
        id: newId,
      })
    );

    dispatch(expenseNotReset());
    navigate("/");
  }

  return (
    <>
      
      <form onSubmit={addExpenseSubmit}>
        <h2>Add an Expense</h2>

        <div>
          <div className="expense-label">
            <div>Label</div>
            <input type="text" ref={addExpenseLableRef} />
          </div>

          <div className="expense-amount">
            <div>Amount</div>
            <input
              type="number"
              value={addExpense}
              onChange={(e) => setAddExpense(e.target.value)}
            />
          </div>

          <div className="expense-category">
            <div>Select Category</div>
            <input
              type="text"
              ref={addExpenseCategoryRef}
              defaultValue="UnCategorized"
            />
            <button className="btn danger">Remove Category</button>
          </div>
        </div>
        <button className="btn">Add Expense</button>
      </form>

      <div className="reset-expenses">
        <h2>Reset Your Expenses</h2>
        <button className="btn danger" onClick={() => dispatch(expenseReset())}>
          Reset Expenses
        </button>
      </div>
    </>
  );
}
