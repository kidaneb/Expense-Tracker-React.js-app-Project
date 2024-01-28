import { useContext, useEffect, useRef, useState } from "react";

import { LOCAL_STORAGE_KEY } from "../Budget/Budget";
import { MyContext } from "../SharedContext";
import { ExpenseTrackerChart } from "../ExpenseTrackerChart";

export function Home() {
  //BUDGET RELATED DECLARATIONS

  const { infoArray, setInfoArray } = useContext(MyContext);
  const { spendingCategoryArray, setSpendingCategoryArray } =
    useContext(MyContext);

  const { budgetItemsArray, setBudgetItemsArray } = useContext(MyContext);

  const budgetRef = useRef(0);
  const { budget, setBudget } = useContext(MyContext);

  // EXPENSE RELATED DECLARATIONS
  const { expenseItemsArray, setExpenseItemsArray } = useContext(MyContext);
  const expenseRef = useRef(0);
  const { expense, setExpense } = useContext(MyContext);

  //CURRENT BALANCE DECLARATION

  const [currentBalance, setCurrentBalance] = useState(0);

  //MODAL RELATED DECLARATION
  const { isModal, setIsModal } = useContext(MyContext);

  // BUDGET RELATED EFFECTS

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(infoArray));
  }, [infoArray]);

  //
  // SETTING THE BUDGET ITEMS ARRAY TO THE LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("BudgetItemsArray", JSON.stringify(budgetItemsArray));
  }, [budgetItemsArray]);
  //

  // SETTING THE CURRENT BUDGET

  useEffect(() => {
    let currentBudget = 0;
    let addedBudget = 0;
    for (const item of budgetItemsArray) {
      if (item.type === "Added Budget") {
        addedBudget += parseFloat(item.amount);
      } else if (item.type === "Budget") {
        currentBudget = addedBudget + parseFloat(item.amount);
        break;
      }
    }
    setBudget((cb) => currentBudget);
  }, [budgetItemsArray]);

  // SET THE EXPENSE ITEMS ARRAY TO THE LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem(
      "ExpenseItemsArray",
      JSON.stringify(expenseItemsArray)
    );
  }, [expenseItemsArray, setExpenseItemsArray]);

  // CALCULATING THE CURRENT EXPENSE

  useEffect(() => {
    if (expenseItemsArray.length !== 0) {
      const currentExpense = expenseItemsArray.reduce((sum, item) => {
        return sum + parseFloat(item.amount);
      }, 0);
      setExpense((ce) => parseFloat(currentExpense));
    } else {
      setExpense((ce) => parseFloat(0));
    }
  }, [expenseItemsArray]);

  // CALCULATING THE CURRENT BUDGET

  useEffect(() => {}, [budgetItemsArray, setBudget]); // Remove setBudgetItemsArray from the dependency array

  // TO SET THE BUDGET TO THE DISPLAY
  useEffect(() => {
    budgetRef.current.textContent = `$${budget}`;
  }, [budget, budgetRef]);

  // EXPENSE RELATED EFFECTS

  useEffect(() => {
    localStorage.setItem(
      "spendingCategoryArray",
      JSON.stringify(spendingCategoryArray)
    );
  }, [spendingCategoryArray]);
  useEffect(() => {
    expenseRef.current.textContent = "$" + expense;
  });

  // CURRENT BALANCE CALCULATION

  useEffect(() => {
    setCurrentBalance((cb) => budget - expense);
  }, [budget, expense]);

  const { transactionClicked } = useContext(MyContext);
  // DATA DECLARATION AND SOME LOGIC USED FOR THE PIE CHART
  const data = [
    { id: 0, value: parseFloat(expense), label: "Total Expense", color: "red" },
    {
      id: 1,
      value: parseFloat(currentBalance),
      label: "Remaining Budget",
      color: "blue",
    },
  ];
  let valueSum;
  useEffect(() => {
    valueSum = data.reduce((sum, item) => {
      return sum + parseFloat(item.value);
    }, 0);
  }, [data]);
  return (
    <>
      <div className="current-balance">
        Your Current Balance is ${currentBalance}
      </div>

      <div className="budget-expense-display">
        <div className="budget-display">
          <div className="budget-title">Budget</div>
          <div className="budget-value" ref={budgetRef}></div>
        </div>

        <div className="expense-display">
          <div className="expense-title">Expense</div>
          <div className="expense-value" ref={expenseRef}></div>
        </div>
      </div>

      <div className="transaction-history-container">
        <div className="transaction-history">
          <div className="transaction-history-title">Transaction History</div>
          <ul>
            {infoArray.map((transaction) => {
              return (
                <li
                  className="transaction-list-item"
                  key={transaction.id}
                  onClick={() => transactionClicked(transaction.id)}
                >
                  {transaction.label}{" "}
                  {`${
                    transaction.category === "Budget" || "Expense Reset"
                      ? "+"
                      : "-"
                  }$${transaction.amount}`}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="pichart-display">
          {valueSum !== 0 && <ExpenseTrackerChart data={data} />}
        </div>
      </div>
    </>
  );
}
