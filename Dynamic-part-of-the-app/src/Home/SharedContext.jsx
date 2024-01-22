import { createContext, useEffect, useState } from "react";
import { LOCAL_STORAGE_KEY } from "../Budget/Budget";

export const MyContext = createContext();

export function SharedContext({ children }) {
  //Main Array
  const [infoArray, setInfoArray] = useState(() => {
    const storedArray = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    return storedArray || [];
  });
  // Spending Category Array
  const [spendingCategoryArray, setSpendingCategoryArray] = useState(() => {
    const storedArray = JSON.parse(localStorage.getItem("spendingCategoryArray"));
    return storedArray || [];
  });
//Budget
  const [budget, setBudget] = useState(() => {
    const storedBudget = JSON.parse(localStorage.getItem("currentBudget"));
    return storedBudget || 0;
  });
// Expense
  const [expense, setExpense] = useState(() => {
    const storedExpense = JSON.parse(localStorage.getItem("currentExpense"));
    return storedExpense || 0;
  });
//Reset Expense
const [isResetExpense, setIsResetExpense] = useState(false);



  return (
    <MyContext.Provider
      value={{
        budget,
        setBudget,
        infoArray,
        setInfoArray,
        spendingCategoryArray,
        setSpendingCategoryArray,
        expense,
        setExpense,
        isResetExpense,
        setIsResetExpense
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
