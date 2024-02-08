import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { numberToMoneyFormat } from "../../Features/numberToMoney";
import { Card, Typography } from "@mui/material";

export function BudgetDisplay() {
  const budgetRef = useRef(0);
  const budget = useSelector((state) => state.budget.value);
  useEffect(() => {
    budgetRef.current.textContent = numberToMoneyFormat(budget);
  }, [budget]);

  return (
    <>
      <Card className="budget-display" elevation={5} sx={{overflow:"auto"}}>
        <Typography className="budget-title" sx={{ fontSize: {xl:"2rem",xs:"1.5rem"}, color:"rgb(18, 230, 78)" }}>
          Budget
        </Typography>
        <Typography
          className="budget-value"
          sx={{ fontSize: {xl:"2rem",xs:"1.5rem"}, color:"rgb(18, 230, 78)" }}
          ref={budgetRef}
        ></Typography>
      </Card>
    </>
  );
}
