import { Button, OutlinedInput, Paper, Typography } from "@mui/material";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToInfoArray } from "../Features/InfoArray";
import { addToBudgetArray } from "../Features/budgetItemsArray";
import { useNavigate } from "react-router-dom";

export function SetBudgetForm() {
  const budgetRef = useRef("");
  const isDarkMode = useSelector((state) => state.darkMode.value);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // SETTING BUDGET SUBMIT FUNCTION

  function setBudgetSubmit(e) {
    e.preventDefault();
    if (budgetRef.current.value === "") {
      alert("Please Enter SomeThing on the field");
      return;
    }

    const newId = crypto.randomUUID();

    // ADDING ITEMS TO THE INFOARRAY

    dispatch(
      addToInfoArray({
        label: `Budget has been set to ${budgetRef.current.value}`,
        type: "Budget",
        amount: budgetRef.current.value,
        category: "Budget",
        date: new Date().toISOString().split("T")[0],
        id: newId,
      })
    );

    //  ADDING ITEMS TO THE BUDGET ITEMS ARRAY

    dispatch(
      addToBudgetArray({
        label: `Budget has been set to ${budgetRef.current.value}`,
        type: "Budget",
        amount: budgetRef.current.value,
        category: "Budget",
        date: new Date().toISOString().split("T")[0],
        id: newId,
      })
    );

    //

    navigate("/");
  }

  return (
    <>
      <Paper
        square
        className="form"
        sx={{
          borderBottom: isDarkMode ? "0.5px solid white" : "0.1px solid black",
          boxShadow: "none",
        }}
      >
        <form onSubmit={setBudgetSubmit}>
          <Typography variant="h4" gutterBottom>
            Set Your Income / Budget
          </Typography>

          <div>
            <Typography>Enter your budget</Typography>
            <OutlinedInput
              sx={{ height: 40, margin: "1em auto" }}
              placeholder="Budget"
              type="number"
              inputRef={budgetRef}
            />
          </div>

          <Button variant="contained" color="success" type="submit">
            Set Budget
          </Button>
        </form>
      </Paper>
    </>
  );
}
