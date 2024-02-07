import { Button, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { budgetNotReset } from "../../Features/isBudgetReset";
import { addToInfoArray } from "../../Features/InfoArray";
import { addToUndoBudgetArray } from "../../Features/undoBudgetArray";
import { resetBudgetArray } from "../../Features/budgetItemsArray";
import { useNavigate } from "react-router-dom";

export function ResetBudgetModal() {
  const budgetItemsArray = useSelector((state) => state.budgetArray.value);
  const budget = useSelector((state) => state.budget.value);
  const isbudgetReset = useSelector((state) => state.isBudgetReset.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // FUNCTION FOR BUDGET RESET

  function resetBudget() {
    // ADD ITEM TO THE INFO ARRAY

    dispatch(
      addToInfoArray({
        label: "Budget has been reset to 0",
        type: "Budget Reset",
        amount: budget,
        category: "Budget Reset",
        date: new Date().toISOString().split("T")[0],
        id: crypto.randomUUID(),
      })
    );
    //SET UNDO BUDGET ARRAY TO THE BUDGET ITEMS ARRAY

    dispatch(addToUndoBudgetArray(budgetItemsArray));

    // SET THE BUDGET ITEMS ARRAY TO EMPTY []

    dispatch(resetBudgetArray());

    // SET THE BUDGET RESET CONDITION AND NAVIGATE TO THE HOME PAGE

    dispatch(budgetNotReset());
    navigate("/");
  }

  return (
    <>
      <Paper
        className="reset-modal"
        style={{
          borderRadius: 15,
          display: isbudgetReset ? "flex" : "",
          boxShadow: "none",
        }}
      >
        <div className="reset-modal-text">
          <div className="reset-modal-text-title">
            <Typography sx={{ fontWeight: "bolder" }}>
              Are you sure you want to reset your budget to 0?
            </Typography>
          </div>
          <div className="reset-modal-text-detail">
            <Typography variant="subtitle2">
              This action can be later undone by deleting the transaction.
            </Typography>
          </div>
        </div>

        <div className="reset-modal-btn-container">
          <Button variant="contained" color="error" onClick={resetBudget}>
            Reset Budget
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(budgetNotReset())}
          >
            Cancel
          </Button>
        </div>
      </Paper>
    </>
  );
}
