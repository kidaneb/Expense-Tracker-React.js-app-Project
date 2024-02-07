import { Button, Paper, Typography } from "@mui/material";
import { expenseReset } from "../Features/isExpenseReset";
import { useDispatch } from "react-redux";

export function ExpenseResetFrom() {
  const dispatch = useDispatch()
  return (
    <>
      <Paper className="reset-expenses" square sx={{ boxShadow: "none" }}>
        <Typography variant="h6">Reset Your Expenses</Typography>

        <Button
          variant="contained"
          color="error"
          onClick={() => dispatch(expenseReset())}
        >
          Reset Expenses
        </Button>
      </Paper>
    </>
  );
}
