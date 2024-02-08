import { useEffect, useRef } from "react";
import { numberToMoneyFormat } from "../../Features/numberToMoney";
import { Card, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export function ExpenseDisplay() {
  const expenseRef = useRef(0);
  const expense = useSelector((state) => state.expense.value);

  useEffect(() => {
    expenseRef.current.textContent = numberToMoneyFormat(expense);
  });
  return (
    <>
      <Card className="expense-display" elevation={5} sx={{overflow:"auto"}}>
        <Typography className="expense-title" sx={{ fontSize: {xl:"2rem",xs:"1.5rem"},color:"red" }}>
          Expense
        </Typography>
        <Typography
          className="expense-value"
          sx={{ fontSize: {xl:"2rem",xs:"1.5rem"},color:"red" }}
          ref={expenseRef}
        ></Typography>
      </Card>
    </>
  );
}
