import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToInfoArray } from "../Features/InfoArray";
import { addToExpenseArray } from "../Features/expenseItemsArray";
import { expenseNotReset, expenseReset } from "../Features/isExpenseReset";

export function Expense() {
  const infoArray = useSelector((state) => state.infoArray.value);
  const expenseItemsArray = useSelector((state) => state.expenseArray.value);
  const addExpenseLableRef = useRef("");
  const [addExpense, setAddExpense] = useState("");
  const addExpenseCategoryRef = useRef("");
  const isexpenseReset = useSelector((state) => state.isExpenseReset.value);

  //

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ADD EXPENSE SUBMIT FUNCTION

  function addExpenseSubmit(e) {
    e.preventDefault();
    if (addExpenseLableRef.current.value === "" || addExpense === "") {
      return;
    }
    const newId = crypto.randomUUID();

    // ADDING ELEMENT TO THE INFOARRAY

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

    // ADDING ELEMENT TO THE EXPENSE ITEMS ARRAY

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
    // SETTING THE EXPNESE RESET CONDITION

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
