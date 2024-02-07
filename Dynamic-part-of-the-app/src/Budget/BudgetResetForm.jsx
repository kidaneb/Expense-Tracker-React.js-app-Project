import { Button, Paper, Typography } from "@mui/material";
import { budgetReset } from "../Features/isBudgetReset";
import { useDispatch } from "react-redux";

export function BudgetResetForm() {
    const dispatch = useDispatch();
  return (
    <>
      <Paper className="reset-budget" square sx={{ boxShadow: "none" }}>
        <Typography variant="h6" gutterBottom>
          Reset Budget
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={() => dispatch(budgetReset())}
        >
          Reset Budget
        </Button>
      </Paper>
    </>
  );
}
