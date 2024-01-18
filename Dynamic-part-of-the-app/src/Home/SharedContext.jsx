import { createContext, useEffect, useState } from "react";
import { LOCAL_STORAGE_KEY } from "../Budget/Budget";

export const MyContext = createContext();

export function SharedContext({ children }) {
  const [infoArray, setInfoArray] = useState(() => {
    const storedArray = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    return storedArray || [];
  });

 const [budget, setBudget] = useState(()=>{
    const storedBudget = JSON.parse(localStorage.getItem("currentBudget"));
    return (storedBudget || 0);
 });
 


  return (
    <MyContext.Provider value={{ budget, setBudget, infoArray, setInfoArray }}>
      {children}
    </MyContext.Provider>
  );
}
