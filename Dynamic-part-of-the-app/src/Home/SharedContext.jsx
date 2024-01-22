import { createContext, useEffect, useState } from "react";
import { LOCAL_STORAGE_KEY } from "../Budget/Budget";

export const MyContext = createContext();

export function SharedContext({ children }) {
  //Main Array
  const [infoArray, setInfoArray] = useState(() => {
    const storedArray = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
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
//Current Balance
const [currentBalance, setCurrentBalance] = useState(0);


  return (
    <MyContext.Provider
      value={{
        budget,
        setBudget,
        infoArray,
        setInfoArray,
        expense,
        setExpense,
        currentBalance,
        setCurrentBalance
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
