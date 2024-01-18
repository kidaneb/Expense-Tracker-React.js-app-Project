import { useContext, useEffect, useRef, useState } from "react";
import { MyContext } from "./SharedContext";
import { LOCAL_STORAGE_KEY } from "../Budget/Budget";

export function Home() {
  const { infoArray, setInfoArray } = useContext(MyContext);

  const budgetRef = useRef(0);
  const { budget, setBudget } = useContext(MyContext);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(infoArray));
  }, [infoArray]);

  useEffect(() => {
    budgetRef.current.textContent = `$${budget}`;
  });

  return (
    <>
      {console.log(budget)}
      <div className="current-balance">Your Current Balance is $9000</div>
      <div className="budget-expense-display">
        <div className="budget-display">
          <div className="budget-title">Budget/Income</div>
          <div className="budget-value" ref={budgetRef}></div>
        </div>

        <div className="expense-display">
          <div className="expense-title">Expense</div>
          <div className="expense-value">$450</div>
        </div>
      </div>
      <div className="transaction-history-container">
        <div className="transaction-history">
          <div className="transaction-history-title">Transaction History</div>
          <ul>
            {infoArray.map((transaction) => {
              return (
                <li key={transaction.id}>
                  {transaction.label}{" "}
                  {`${transaction.category === "Budget" ? "+" : "-"}$${
                    transaction.amount
                  }`}
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
