import { useContext, useEffect, useRef, useState } from "react";
import { MyContext } from "./SharedContext";
import { LOCAL_STORAGE_KEY } from "../Budget/Budget";

export function Home() {
  //BUDGET RELATED DECLARATIONS
  const { infoArray, setInfoArray } = useContext(MyContext);
  const budgetRef = useRef(0);
  const { budget, setBudget } = useContext(MyContext);

  // EXPENSE RELATED DECLARATIONS
  const expenseRef = useRef(0);
  const { expense, setExpense } = useContext(MyContext);

  //CURRENT BALANCE DECLARATION

const [currentBalance, setCurrentBalance] = useState(0);
  

  //MODAL RELATED DECLARATION

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
    expenseRef.current.textContent = "$" + expense;
  });
  useEffect(() => {
    localStorage.setItem("currentExpense", expense);
  }, [expense]);
// CURRENT BALANCE CALCULATION

useEffect(()=>{
  setCurrentBalance((cb)=> budget - expense)
},[budget, expense])




  return (
    <>
    
      <div className="current-balance">Your Current Balance is ${currentBalance}</div>
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
                <li key={transaction.id} >
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
