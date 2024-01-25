import { createContext, useEffect, useState } from "react";
import { LOCAL_STORAGE_KEY } from "./Budget/Budget";

export const MyContext = createContext();

export function SharedContext({ children }) {
  //Main Array
  const [infoArray, setInfoArray] = useState(() => {
    const storedArray = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    return storedArray || [];
  });
  // Spending Category Array
  const [spendingCategoryArray, setSpendingCategoryArray] = useState(() => {
    const storedArray = JSON.parse(
      localStorage.getItem("spendingCategoryArray")
    );
    return storedArray || [];
  });
  //Budget

  const [budget, setBudget] = useState(() => {
    const storedBudget = JSON.parse(localStorage.getItem("currentBudget"));
    return storedBudget || 0;
  });

  // Reset Budget
  const [isbudgetReset, setIsBudgetReset] = useState(false);

  // Expense
  const [expense, setExpense] = useState(() => {
    const storedExpense = JSON.parse(localStorage.getItem("currentExpense"));
    return storedExpense || 0;
  });

  
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
  const [isExpenseReset, setIsExpenseReset] = useState(false);

  //  Modal
  const [isModal, setIsModal] = useState(false);
  const [transactionItemId, setTransactionItemId] = useState(0);
  let Id;
  function transactionClicked(id) {
    setIsModal(true);
    setTransactionItemId(id);
  }

  return (
    <MyContext.Provider
      value={{
        budget,
        setBudget,
        isbudgetReset,
        setIsBudgetReset,
        infoArray,
        setInfoArray,
        spendingCategoryArray,
        setSpendingCategoryArray,
        expense,
        setExpense,
       
        isExpenseReset,
        setIsExpenseReset,
        isModal,
        setIsModal,
        transactionClicked,
        transactionItemId,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
