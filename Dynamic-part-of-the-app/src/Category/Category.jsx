import { useContext, useState } from "react";
import { MyContext } from "../Home/SharedContext";

export function Category() {
  const { infoArray, setInfoArray } = useContext(MyContext);
  const {spendingCategoryArray, isSpendingCategoryArray} = useContext(MyContext);
  const {budget, setBudget} = useContext(MyContext)

  const {isResetExpense, setIsResetExpense} = useContext(MyContext);
  
  
  let categoryArray = isResetExpense ? [] : [...new Set(spendingCategoryArray.map((item) => item.category)),].reverse();
  categoryArray = categoryArray.filter((category) => category !== "Budget");
  console.log(categoryArray);
  return (
    <>
      <div className="spending-category-title">Spending Catagory</div>
      <div className="spending-categories">
        {
          <div className="category">
            <div className="category-name">Budget</div>
            <div className="category-spending">{budget}</div>
          </div>
        }
        {categoryArray.map((element, index) => {
          let sum = 0;
          return (
            <div className="category" key={index}>
              <div className="category-name">{element}</div>
              {infoArray.map((item) => {
                if (item.category === element) {
                  sum += parseFloat(item.amount);
                }
              })}
              <div className="category-spending">{sum}</div>
            </div>
          );
        })}

        
      </div>
    </>
  );
}
