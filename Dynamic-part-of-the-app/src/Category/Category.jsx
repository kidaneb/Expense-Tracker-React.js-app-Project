import { useSelector } from "react-redux";

export function Category() {
  const infoArray = useSelector((state) => state.infoArray.value);
  const expenseItemsArray = useSelector((state) => state.expenseArray.value);
  const budget = useSelector((state) => state.budget.value);
  const isexpenseReset = useSelector((state) => state.isExpenseReset.value);

  // EXTRACTING CATEGORY ARRAY FROM THE SPENDING CATEGORY ARRAY
  
  let categoryArray = isexpenseReset
    ? []
    : [...new Set(expenseItemsArray.map((item) => item.category))].reverse();

  categoryArray = categoryArray.filter((category) => category !== "Budget");
  
  //
  return (
    <>
      <div className="spending-category-title">Spending Catagory</div>
      <div className="spending-categories">
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
