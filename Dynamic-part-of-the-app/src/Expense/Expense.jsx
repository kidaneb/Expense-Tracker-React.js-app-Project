import { useContext, useRef, useState } from "react";
import { MyContext } from "../SharedContext";
import { useNavigate } from "react-router-dom";

export function Expense() {
  const { infoArray, setInfoArray } = useContext(MyContext);
  const {expenseItemsArray, setExpenseItemsArray} = useContext(MyContext);
  const { spendingCategoryArray, setSpendingCategoryArray } =
    useContext(MyContext);
  const { expense, setExpense } = useContext(MyContext);
  const addExpenseLableRef = useRef(null);
  const [addExpense, setAddExpense] = useState("");
  const addExpenseCategoryRef = useRef(null);
  const { isExpenseReset, setIsExpenseReset } = useContext(MyContext);
  const navigate = useNavigate();

  function addExpenseSubmit(e) {
    e.preventDefault();
    if (
      addExpenseLableRef.current.value === "" ||
      addExpense === ""
    ) {
      return;
    }
    const newId = crypto.randomUUID();
    setInfoArray((currentInfoArray) => [
      {
        label: addExpenseLableRef.current.value,
        type: "Expense",
        amount: addExpense,
        category: addExpenseCategoryRef.current.value,
        date: new Date().toISOString().split("T")[0],
        id: newId,
      },
      ...currentInfoArray,
    ]);
    setSpendingCategoryArray((currentArray) => [
      {
        label: addExpenseLableRef.current.value,
        type: "Expense",
        amount: addExpense,
        category: addExpenseCategoryRef.current.value,
        date: new Date().toISOString().split("T")[0],
        id: newId,
      },
      ...currentArray,
    ]);

    setExpenseItemsArray((currentArray) => [
      {
        label: addExpenseLableRef.current.value,
        type: "Expense",
        amount: addExpense,
        category: addExpenseCategoryRef.current.value,
        date: new Date().toISOString().split("T")[0],
        id: newId,
      },
      ...currentArray,
    ]);
    
    setIsExpenseReset(false);
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
            <input type="number" value={addExpense} onChange={e=>setAddExpense(e.target.value)} />
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
        <button className="btn danger" onClick={() => setIsExpenseReset(true)}>
          Reset Expenses
        </button>
      </div>
    </>
  );
}
