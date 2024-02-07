import { Button, OutlinedInput, Paper, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToInfoArray } from "../Features/InfoArray";
import { addToExpenseArray } from "../Features/expenseItemsArray";
import { expenseNotReset } from "../Features/isExpenseReset";
import { useNavigate } from "react-router-dom";

export function AddExpenseForm() {
  const isDarkMode = useSelector((state) => state.darkMode.value);
  const addExpenseLableRef = useRef("");
  const [addExpense, setAddExpense] = useState("");
  const addExpenseCategoryRef = useRef("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   SUBMIT FORM
  function addExpenseSubmit(e) {
    e.preventDefault();
    if (addExpenseLableRef.current.value === "" || addExpense === "") {
      if (addExpenseLableRef.current.value === "" && addExpense === "") {
        alert("Please enter the label and amount");

        return;
      } else if (addExpense === "") {
        alert("Please enter the amount");
        return;
      } else if (addExpenseLableRef.current.value === "") {
        alert("Please enter label");
        return;
      }
    }
    const newId = crypto.randomUUID();

    // ADDING ELEMENT TO THE INFOARRAY

    dispatch(
      addToInfoArray({
        label: addExpenseLableRef.current.value,
        type: "Expense",
        amount: addExpense,
        category: addExpenseCategoryRef.current.value,
        date: new Date().toISOString().split("T")[0],
        id: newId,
      })
    );

    // ADDING ELEMENT TO THE EXPENSE ITEMS ARRAY

    dispatch(
      addToExpenseArray({
        label: addExpenseLableRef.current.value,
        type: "Expense",
        amount: addExpense,
        category: addExpenseCategoryRef.current.value,
        date: new Date().toISOString().split("T")[0],
        id: newId,
      })
    );
    // SETTING THE EXPNESE RESET CONDITION

    dispatch(expenseNotReset());
    navigate("/");
  }

  return (
    <>
      <Paper
        className="form"
        square
        style={{
          borderBottom: isDarkMode ? "0.5px solid white" : "0.1px solid black",
          boxShadow: "none",
        }}
      >
        <form onSubmit={addExpenseSubmit}>
          <Typography variant="h4">Add an Expense</Typography>

          <div>
            <div className="expense-label">
              <Typography>Label</Typography>
              <OutlinedInput
                autoFocus
                placeholder="label"
                type="text"
                sx={{ height: 40 }}
                inputRef={addExpenseLableRef}
              />
            </div>

            <div className="expense-amount">
              <Typography>Amount</Typography>

              <OutlinedInput
                placeholder="Amount"
                type="number"
                value={addExpense}
                onChange={(e) => setAddExpense(e.target.value)}
                sx={{ height: 40 }}
              />
            </div>

            <div className="expense-category">
              <Typography>Select Category</Typography>

              <OutlinedInput
                type="text"
                inputRef={addExpenseCategoryRef}
                defaultValue={"UnCategorized"}
              />
              <Button variant="contained" color="error" sx={{ margin: "1em" }}>
                Remove Category
              </Button>
            </div>
          </div>
          <Button type="submit" variant="contained">
            Add Expense
          </Button>
        </form>
      </Paper>
    </>
  );
}
