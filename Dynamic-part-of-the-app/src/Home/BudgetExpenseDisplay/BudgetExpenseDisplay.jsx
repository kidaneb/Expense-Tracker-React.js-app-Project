import { Paper } from "@mui/material";
import { BudgetDisplay } from "./BudgetDisplay";
import { ExpenseDisplay } from "./ExpenseDisplay";

export function BudgetExpenseDisplay() {
  return (
    <>
      <Paper className="budget-expense-display" square elevation={1}>
        <BudgetDisplay />

        <ExpenseDisplay />
      </Paper>
    </>
  );
}
