import { Button, OutlinedInput, Paper, Typography } from "@mui/material";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToInfoArray } from "../Features/InfoArray";
import { addToBudgetArray } from "../Features/budgetItemsArray";

export function AddToBudgetForm() {
  // ADD TO BUDGET DECLARATIONS
  const isDarkMode = useSelector((state) => state.darkMode.value);
  const addBudgetLabelRef = useRef("");
  const addBudgetRef = useRef(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //  SETTING ADD TO BUDGET SUBMIT FUNCTION

  function addToBudgetSubmit(e) {
    e.preventDefault();
    if (
      addBudgetLabelRef.current.value === "" &&
      addBudgetRef.current.value === ""
    ) {
      alert("Please Enter The Label and The Amount");
      return;
    }
    if (addBudgetLabelRef.current.value === "") {
      alert("Please Enter the Label");
      return;
    }
    if (addBudgetRef.current.value === "") {
      alert("Please Enter the Amount");
      return;
    }

    const newId = crypto.randomUUID();

    // ADDING ITEMS TO THE INFOARRAY

    dispatch(
      addToInfoArray({
        label: addBudgetLabelRef.current.value,
        type: "Added Budget",
        amount: addBudgetRef.current.value,
        category: "Budget",
        date: new Date().toISOString().split("T")[0],
        id: newId,
      })
    );

    //  ADDING ITEMS TO THE BUDGET ITEMS ARRAY

    dispatch(
      addToBudgetArray({
        label: addBudgetLabelRef.current.value,
        type: "Added Budget",
        amount: addBudgetRef.current.value,
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
        <form onSubmit={addToBudgetSubmit}>
          <Typography variant="h5" gutterBottom>
            Add an Income Source
          </Typography>
          <div>
            <Typography>Label</Typography>

            <OutlinedInput
              sx={{ height: 40, margin: "1em auto" }}
              type="text"
              inputRef={addBudgetLabelRef}
              placeholder="label"
            />
          </div>
          <div>
            <Typography>Amount</Typography>

            <OutlinedInput
              placeholder="Amount"
              type="number"
              sx={{ height: 40, margin: "1em auto" }}
              inputRef={addBudgetRef}
            />
          </div>
          <Button type="submit" variant="contained" color="success">
            Add to Budget
          </Button>
        </form>
      </Paper>
    </>
  );
}
