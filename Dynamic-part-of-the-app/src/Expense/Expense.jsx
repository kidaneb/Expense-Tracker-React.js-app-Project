import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToInfoArray } from "../Features/InfoArray";
import { addToExpenseArray } from "../Features/expenseItemsArray";
import { expenseNotReset, expenseReset } from "../Features/isExpenseReset";
import Input from "@mui/material/Input";
import {
  Button,
  FormControl,
  InputBase,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

export function Expense() {
  const infoArray = useSelector((state) => state.infoArray.value);
  const expenseItemsArray = useSelector((state) => state.expenseArray.value);
  const addExpenseLableRef = useRef("");
  const [addExpense, setAddExpense] = useState("");
  const addExpenseCategoryRef = useRef("");
  const isexpenseReset = useSelector((state) => state.isExpenseReset.value);
  const isDarkMode = useSelector((state) => state.darkMode.value);

  //

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ADD EXPENSE SUBMIT FUNCTION

  function addExpenseSubmit(e) {
    e.preventDefault();
    if (addExpenseLableRef.current.value === "" || addExpense === "") {
      return;
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
          {/* <h2>Add an Expense</h2> */}
          <Typography variant="h4">Add an Expense</Typography>

          <div>
            <div className="expense-label">
              {/* <div>Label</div> */}
              <Typography>Label</Typography>
              {/* <input type="text" ref={addExpenseLableRef} /> */}
              <OutlinedInput
                autoFocus
                placeholder="label"
                type="text"
                sx={{ height: 40 }}
                inputRef={addExpenseLableRef}
              />
            </div>

            <div className="expense-amount">
              {/* <div>Amount</div> */}
              <Typography>Amount</Typography>
              {/* <input
              type="number"
              value={addExpense}
              onChange={(e) => setAddExpense(e.target.value)}
            /> */}
              <OutlinedInput
                placeholder="Amount"
                type="number"
                value={addExpense}
                onChange={(e) => setAddExpense(e.target.value)}
                sx={{ height: 40 }}
              />
            </div>

            <div className="expense-category">
              {/* <div>Select Category</div> */}
              <Typography>Select Category</Typography>
              {/* <input
              type="text"
              ref={addExpenseCategoryRef}
              defaultValue="UnCategorized"
            /> */}
              <OutlinedInput
                type="text"
                inputRef={addExpenseCategoryRef}
                defaultValue={"UnCategorized"}
              />
              {/* <button className="btn danger">Remove Category</button> */}
              <Button variant="contained" color="error" sx={{ margin: "1em" }}>
                Remove Category
              </Button>
            </div>
          </div>
          {/* <button className="btn">Add Expense</button> */}
          <Button type="submit" variant="contained">
            Add Expense
          </Button>
        </form>
      </Paper>

      <Paper className="reset-expenses" square sx={{boxShadow:"none"}}>
        {/* <h2>Reset Your Expenses</h2> */}
        <Typography variant="h6">Reset Your Expenses</Typography>
        {/* <button className="btn danger" onClick={() => dispatch(expenseReset())}>
          Reset Expenses
        </button> */}
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
