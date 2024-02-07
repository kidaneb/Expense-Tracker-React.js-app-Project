import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToInfoArray } from "../Features/InfoArray";
import { addToBudgetArray } from "../Features/budgetItemsArray";
import { budgetReset } from "../Features/isBudgetReset";
import {
  Button,
  FormControl,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

export function Budget() {
  const infoArray = useSelector((state) => state.infoArray.value);
  const budgetItemsArray = useSelector((state) => state.budgetArray.value);
  const budgetRef = useRef("");
  const isbudgetReset = useSelector((state) => state.isBudgetReset.value);
  const isDarkMode = useSelector((state) => state.darkMode.value);

  // ADD TO BUDGET DECLARATIONS

  const addBudgetLabelRef = useRef("");
  const addBudgetRef = useRef(0);

  //

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        label: addBudgetLabelRef.current.value,
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
        backDrop={false}
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
              inputRef={budgetRef}
            />
          </div>

          <Button variant="contained" color="success" type="submit">
            Set Budget
          </Button>
        </form>
      </Paper>

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
