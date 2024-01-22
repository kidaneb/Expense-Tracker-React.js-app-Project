import { useContext, useEffect, useRef, useState } from "react";

import { LOCAL_STORAGE_KEY } from "../Budget/Budget";
import { MyContext } from "../SharedContext";

export function Home() {
  //BUDGET RELATED DECLARATIONS
  const { infoArray, setInfoArray } = useContext(MyContext);
  const { spendingCategoryArray, setSpendingCategoryArray } =
    useContext(MyContext);
  const budgetRef = useRef(0);
  const { budget, setBudget } = useContext(MyContext);

  // EXPENSE RELATED DECLARATIONS
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
  useEffect(() => {
    localStorage.setItem("currentBudget", budget);
  }, [budget, setBudget]);

  useEffect(() => {
    budgetRef.current.textContent = `$${budget}`;
  }, [budget]);

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
  useEffect(() => {
    localStorage.setItem("currentExpense", expense);
  }, [expense]);
  // CURRENT BALANCE CALCULATION

  useEffect(() => {
    setCurrentBalance((cb) => budget - expense);
  }, [budget, expense]);

  // Transaction function

  // function transactionClicked(id){

  //   setIsModal(true)
  // }
  const { transactionClicked } = useContext(MyContext);

  return (
    <>
      <div className="current-balance">
        Your Current Balance is ${currentBalance}
      </div>
      <div className="budget-expense-display">
        <div className="budget-display">
          <div className="budget-title">Budget/Income</div>
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
          <h1>Pi-Chart</h1>
        </div>
      </div>
    </>
  );
}
