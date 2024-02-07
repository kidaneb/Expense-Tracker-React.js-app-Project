import { useSelector } from "react-redux";
import { Card, Typography } from "@mui/material";

export function Category() {
  const expenseItemsArray = useSelector((state) => state.expenseArray.value);
  const isexpenseReset = useSelector((state) => state.isExpenseReset.value);

  // EXTRACTING CATEGORY ARRAY FROM THE SPENDING CATEGORY ARRAY

  let categoryArray = isexpenseReset
    ? []
    : [...new Set(expenseItemsArray.map((item) => item.category))].reverse();

  categoryArray = categoryArray.filter((category) => category !== "Budget");

  //
  return (
    <>
      {/* <div className="spending-category-title">Spending Catagory</div> */}
      <Typography variant="h4" className="spending-category-title">
        Spending Category
      </Typography>
      <div className="spending-categories">
        {categoryArray.map((element, index) => {
          let sum = 0;
          return (
            <Card className="category" key={index} elevation={5}>
              <Typography variant="h6">{element}</Typography>
              {expenseItemsArray.map((item) => {
                if (item.category === element) {
                  sum += parseFloat(item.amount);
                }
              })}
              <Typography variant="h6">{sum}</Typography>
            </Card>
          );
        })}
      </div>
    </>
  );
}
