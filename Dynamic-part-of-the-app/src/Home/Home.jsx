import { useContext, useEffect, useRef, useState } from "react";
import { MyContext } from "../SharedContext";
import { ExpenseTrackerChart } from "../ExpenseTrackerChart";
import { useDispatch, useSelector } from "react-redux";
import { setToBudgetArray } from "../Features/budgetItemsArray";
import { setBudget } from "../Features/budget";
import { setExpense } from "../Features/expense";
import { modalSet } from "../Features/modal";
import { setTransactionItemId } from "../Features/transactionItemId";

export function Home() {
  //BUDGET RELATED DECLARATIONS

  const infoArray = useSelector((state) => state.infoArray.value);
  const budgetItemsArray = useSelector((state) => state.budgetArray.value);
  const undoBudgetArray = useSelector((state) => state.undoBudgetArray.value);
  const budgetRef = useRef(0);
  const budget = useSelector((state) => state.budget.value);
  // EXPENSE RELATED DECLARATIONS
  const spendingCategoryArray = useSelector(
    (state) => state.spendingArray.value
  );
  const expenseItemsArray = useSelector((state) => state.expenseArray.value);
  const expenseRef = useRef(0);
  const expense = useSelector((state) => state.expense.value);
  //CURRENT BALANCE DECLARATION

  const [currentBalance, setCurrentBalance] = useState(0);

  //MODAL RELATED DECLARATION
  const isModal = useSelector((state) => state.isModal.value);
  const transactionItemId = useSelector(
    (state) => state.transactionItemId.value
  );
  const dispatch = useDispatch();
  // BUDGET RELATED EFFECTS

  useEffect(() => {
    localStorage.setItem("infoArray", JSON.stringify(infoArray));
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
    dispatch(setBudget(currentBudget));
  }, [budgetItemsArray]);

  // SET THE EXPENSE ITEMS ARRAY TO THE LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem(
      "ExpenseItemsArray",
      JSON.stringify(expenseItemsArray)
    );
  }, [expenseItemsArray]);

  // CALCULATING THE CURRENT EXPENSE

  useEffect(() => {
    if (expenseItemsArray.length !== 0) {
      const currentExpense = expenseItemsArray.reduce((sum, item) => {
        return sum + parseFloat(item.amount);
      }, 0);
      // setExpense((ce) => parseFloat(currentExpense));
      dispatch(setExpense(parseFloat(currentExpense)));
    } else {
      // setExpense((ce) => parseFloat(0));
      dispatch(setExpense(parseFloat(0)));
    }
  }, [expenseItemsArray]);

  // CALCULATING THE CURRENT BUDGET

  // TO SET THE BUDGET TO THE DISPLAY

  useEffect(() => {
    budgetRef.current.textContent = `$${budget}`;
  }, [budget]);

  // EXPENSE RELATED EFFECTS
  // saving spending category array to the local storage
  useEffect(() => {
    localStorage.setItem(
      "spendingCategoryArray",
      JSON.stringify(spendingCategoryArray)
    );
  }, [spendingCategoryArray]);
  // set the expense on the display
  useEffect(() => {
    expenseRef.current.textContent = "$" + expense;
  });

  // CURRENT BALANCE CALCULATION

  useEffect(() => {
    setCurrentBalance((cb) => budget - expense);
  }, [budget, expense]);

  // function for clicked transaction from transaction history
  function transactionClicked(id) {
    dispatch(modalSet());
    dispatch(setTransactionItemId(id));
  }
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
      {JSON.stringify(undoBudgetArray)}
      {JSON.stringify(budgetItemsArray)}
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
          {/* {valueSum !== 0 && <ExpenseTrackerChart data={data} />} */}
        </div>
      </div>
    </>
  );
}
