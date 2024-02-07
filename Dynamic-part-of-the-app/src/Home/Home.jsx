import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBudget } from "../Features/budget";
import { setExpense } from "../Features/expense";
import { CurrentBalance } from "./CurrentBalance";
import { BudgetExpenseDisplay } from "./BudgetExpenseDisplay/BudgetExpenseDisplay";
import { numberToMoneyFormat } from "../Features/numberToMoney";
import { Transaction } from "./Transaction/Transaction";

export function Home() {
  //BUDGET RELATED DECLARATIONS

  const infoArray = useSelector((state) => state.infoArray.value);
  const budgetItemsArray = useSelector((state) => state.budgetArray.value);
  const budget = useSelector((state) => state.budget.value);

  // EXPENSE RELATED DECLARATIONS

  const expenseItemsArray = useSelector((state) => state.expenseArray.value);
  const expense = useSelector((state) => state.expense.value);

  //CURRENT BALANCE DECLARATION

  const [currentBalance, setCurrentBalance] = useState(0);


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

  // CALCULATING AND SETTING THE CURRENT BUDGET

  useEffect(() => {
    let currentBudget = 0;

    for (const item of budgetItemsArray) {
      if (item.type === "Added Budget") {
        currentBudget += parseFloat(item.amount);
      } else if (item.type === "Budget") {
        currentBudget += parseFloat(item.amount);
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
      
      dispatch(setExpense(parseFloat(currentExpense)));
    } else {
      
      dispatch(setExpense(parseFloat(0)));
    }
  }, [expenseItemsArray]);

  // CURRENT BALANCE CALCULATION

  useEffect(() => {
    setCurrentBalance((cb) => budget - expense);
  }, [budget, expense]);

  return (
    <>
      {/* CURRENT BALANCE DISPLAY */}
      <CurrentBalance
        numberToMoneyFormat={numberToMoneyFormat}
        currentBalance={currentBalance}
      />
      {/* BUDGET EXPENSE DISPLAY */}
      <BudgetExpenseDisplay />
      {/* TRANSACTION HISROTY WITH PIE CHART DISPLAY */}
      <Transaction />
    </>
  );
}
