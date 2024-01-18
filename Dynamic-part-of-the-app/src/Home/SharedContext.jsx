import { createContext, useEffect, useState } from "react";
import { LOCAL_STORAGE_KEY } from "../Budget/Budget";

export const MyContext = createContext();

export function SharedContext({ children }) {
  const [infoArray, setInfoArray] = useState(() => {
    const storedArray = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    return storedArray || [];
  });

 const [budget, setBudget] = useState(0);
 
useEffect(()=>{
  const currentBudget = infoArray.reduce((sum,element)=>{
    if(element.category === "Budget"){
      return(sum + parseFloat(element.amount));
    }
  },0)
  setBudget((cb)=> currentBudget || 0);
  console.log(budget)
},[])

  return (
    <MyContext.Provider value={{ budget, setBudget, infoArray, setInfoArray }}>
      {children}
    </MyContext.Provider>
  );
}
