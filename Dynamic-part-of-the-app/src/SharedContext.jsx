import { createContext, useEffect, useState } from "react";

export const MyContext = createContext();

export function SharedContext({ children }) {
  //Main Array
  // const [infoArray, setInfoArray] = useState(() => {
  //   const storedArray = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   return storedArray || [];
  // });
  // Spending Category Array
  const [spendingCategoryArray, setSpendingCategoryArray] = useState(() => {
    const storedArray = JSON.parse(
      localStorage.getItem("spendingCategoryArray")
    );
    return storedArray || [];
  });
  //Budget

  const [budget, setBudget] = useState(0);

  const [budgetItemsArray, setBudgetItemsArray] = useState(()=>{
    const storedArray = JSON.parse(localStorage.getItem("BudgetItemsArray"));
    return storedArray || [];
  })

  // Reset Budget
  const [isbudgetReset, setIsBudgetReset] = useState(false);
const [undoBudgetArray, setUndoBudgetArray] = useState([]);
  // Expense
  const [expenseItemsArray, setExpenseItemsArray] = useState(() => {
    const storedArray = JSON.parse(localStorage.getItem("ExpenseItemsArray"));
    return storedArray || [];
  });

  const [expense, setExpense] = useState(0);

  // function currentExpense() {
  //   const newExpense = infoArray.reduce((sum, item) => {
  //     if (item.type === "Expense" && !isNaN(parseFloat(item.amount))) {
  //       sum += parseFloat(item.amount);
  //     }
  //     return sum;
  //   }, 0);

  //   setExpense((currentExpense) => parseFloat(newExpense));
  // }

  //Reset Expense

  
  //  Modal
  const [isModal, setIsModal] = useState(false);
  const [transactionItemId, setTransactionItemId] = useState(0);
  

  return (
    <MyContext.Provider
      value={{
        // budget,
        // setBudget,
        
        // isbudgetReset,
        // setIsBudgetReset,
        
        // isExpenseReset,
        // setIsExpenseReset,

        // infoArray,
        // setInfoArray,
        
        // budgetItemsArray,
        // setBudgetItemsArray,
        
        // spendingCategoryArray,
        // setSpendingCategoryArray,
        
        // expense,
        // setExpense,
        
        
        
        // isModal,
        // setIsModal,
        
        
        // transactionItemId,
        // setTransactionItemId,
        // expenseItemsArray,
        // setExpenseItemsArray,
        
        // undoExpeseArray,
        // setUndoExpenseArray,
        
        // undoBudgetArray,
        // setUndoBudgetArray
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
