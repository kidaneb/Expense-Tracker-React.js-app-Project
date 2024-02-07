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
      <Card className="expense-display" elevation={5}>
        <Typography className="expense-title" sx={{ fontSize: "2rem" }}>
          Expense
        </Typography>
        <Typography
          className="expense-value"
          sx={{ fontSize: "2rem" }}
          ref={expenseRef}
        ></Typography>
      </Card>
    </>
  );
}
