import { Button, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToUndoExpenseArray } from "../../Features/undoExpenseArray";
import { resetExpenseArray } from "../../Features/expenseItemsArray";
import { expenseNotReset } from "../../Features/isExpenseReset";
import { useNavigate } from "react-router-dom";
import { addToInfoArray } from "../../Features/InfoArray";

export function ResetExpenseModal() {
    const expenseItemsArray = useSelector((state) => state.expenseArray.value);
    const isexpenseReset = useSelector((state) => state.isExpenseReset.value);
    const expense = useSelector((state) => state.expense.value);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //  FUNCTION FOR EXPENSE RESET

  function resetExpense() {
    // ADD ITEM TO THE INFO ARRAY

    dispatch(
      addToInfoArray({
        label: "Expense has been reset to 0",
        type: "Expense Reset",
        amount: expense,
        category: "Expense Reset",
        date: new Date().toISOString().split("T")[0],
        id: crypto.randomUUID(),
      })
    );

    //SET UNDO EXPENSE ARRAY TO THE EXPENSE ITEMS ARRAY

    dispatch(addToUndoExpenseArray(expenseItemsArray));

    // SET THE EXPENSE ITEMS ARRAY TO EMPTY []

    dispatch(resetExpenseArray());

    // SET THE EXPENSE RESET CONDITION AND NAVIGATE TO THE HOME PAGE

    dispatch(expenseNotReset());
    navigate("/");
  }
  return (
    <>
      <Paper
        className="reset-modal"
        style={{
          borderRadius: 15,
          display: isexpenseReset ? "flex" : "",
        }}
      >
        <div className="reset-modal-text">
          <div className="reset-modal-text-title">
            <Typography sx={{ fontWeight: "bolder" }}>
              Are you sure you want to reset your expenses to 0?
            </Typography>
          </div>
          <div className="reset-modal-text-detail">
            <Typography variant="subtitle2">
              This action can be later undone by deleting the transaction.
              However the expense categories will return and the amount will be
              put under Uncategorized.
            </Typography>
          </div>
        </div>

        <div className="reset-modal-btn-container">
          <Button variant="contained" color="error" onClick={resetExpense}>
            Reset Expense
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(expenseNotReset())}
          >
            Cancel
          </Button>
        </div>
      </Paper>
    </>
  );
}
