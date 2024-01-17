import { createContext, useState } from "react";

export const MyContext = createContext();

export function SharedContext({ children }) {
  const [budget, setBudget] = useState(0);
  const [infoArray, setInfoArray] = useState([]);
  return (
    <MyContext.Provider value={{ budget, setBudget, infoArray, setInfoArray }}>
      {children}
    </MyContext.Provider>
  );
}
