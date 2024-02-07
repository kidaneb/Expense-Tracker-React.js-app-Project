import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { NavBar } from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import { addToUndoBudgetArray } from "./Features/undoBudgetArray.js";
import { addToUndoExpenseArray } from "./Features/undoExpenseArray.js";
import { addToInfoArray, filterInfoArray } from "./Features/InfoArray.js";
import { budgetNotReset } from "./Features/isBudgetReset.js";
import { expenseNotReset } from "./Features/isExpenseReset.js";
import { modalNotSet } from "./Features/modal.js";
import {
  filterExpenseArray,
  resetExpenseArray,
  setToExpenseArray,
} from "./Features/expenseItemsArray.js";
import {
  filterBudgetArray,
  resetBudgetArray,
  setToBudgetArray,
} from "./Features/budgetItemsArray.js";
import {
  Button,
  Paper,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";

export function NavLayout() {
  const infoArray = useSelector((state) => state.infoArray.value);
  const budgetItemsArray = useSelector((state) => state.budgetArray.value);
  const expenseItemsArray = useSelector((state) => state.expenseArray.value);

  const budget = useSelector((state) => state.budget.value);
  const expense = useSelector((state) => state.expense.value);

  const isexpenseReset = useSelector((state) => state.isExpenseReset.value);
  const isbudgetReset = useSelector((state) => state.isBudgetReset.value);

  const undoBudgetArray = useSelector((state) => state.undoBudgetArray.value);
  const undoExpenseArray = useSelector((state) => state.undoExpenseArray.value);

  const isModal = useSelector((state) => state.isModal.value);

  const transactionItemId = useSelector(
    (state) => state.transactionItemId.value
  );

  const isDarkMode = useSelector((state) => state.darkMode.value);
  //
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // FUNCTION TO DELETE THE TRANSACTIONS

  function deleteTransactionItem() {
    // FILTERING THE INFO ARRAY AND SETTING UNDO ARRAYS WHEN NEEDED
    for (const item of infoArray) {
      if (item.id === transactionItemId) {
        if (item.category === "Budget Reset") {
          // SETTING BUDGET ARRAY TO UNDO BUDGET ARRAY

          dispatch(setToBudgetArray(undoBudgetArray));
        }
        if (item.category === "Expense Reset") {
          // SETTING EXPENSE ARRAY TO UNDO EXPENSE ARRAY

          dispatch(setToExpenseArray(undoExpenseArray));
        }
      }
    }
    // FILTERING THE INFO ARRAY

    dispatch(filterInfoArray(transactionItemId));

    // FILTERING THE BUDGET ITEMS ARRAY

    dispatch(filterBudgetArray(transactionItemId));

    // FILTERING THE EXPENSE ITEMS ARRAY

    dispatch(filterExpenseArray(transactionItemId));

    // SET THE MODAL CONDITION AND NAVIGATE TO THE HOME PAGE
    dispatch(modalNotSet());
    navigate("/");
  }

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
  // FUNCTION TO CONVERT NUMBER INTO MONEY FORMAT
  function numberToMoneyFormat(number) {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    });
  }
  // LOGIC FOR THE DARK AND LIGHT MODE

  const darkTheme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Paper variant="elevation" square elevation={1} className="container">
        <Header />

        <Paper className="detail-container" square sx={{ boxShadow: "none" }}>
          <NavBar />
          <Paper
            className="transaction-container"
            square
            sx={{ boxShadow: "none" }}
          >
            <Outlet />
          </Paper>
        </Paper>
      </Paper>

      {/* TRANSACTION MODAL */}
      <Paper
        square={false}
        className="modal"
        style={{ borderRadius: "16px", display: isModal ? "flex" : "none" }}
      >
        <div className="modal-text">
          <Typography
            variant="h5"
            className="modal-text-title"
            sx={{ margin: "0.3em" }}
          >
            Transaction History
          </Typography>
          {infoArray.map((item) => {
            if (item.id === transactionItemId) {
              return (
                <div
                  key={item.id}
                  className="modal-text-key-detail-pair-container"
                >
                  <div className="modal-text-key-detail-pair">
                    <span className="modal-text-key">
                      <Typography variant="body1" sx={{ fontWeight: "bolder" }}>
                        Label:
                      </Typography>
                    </span>
                    <span className="modal-text-detail">
                      <Typography variant="body1">{item.label}</Typography>
                    </span>
                  </div>

                  <div className="modal-text-key-detail-pair">
                    <span className="modal-text-key">
                      <Typography variant="body1" sx={{ fontWeight: "bolder" }}>
                        Type:
                      </Typography>
                    </span>
                    <span className="modal-text-detail">
                      <Typography variant="body1"> {item.type}</Typography>
                    </span>
                  </div>

                  <div className="modal-text-key-detail-pair">
                    <span className="modal-text-key">
                      <Typography variant="body1" sx={{ fontWeight: "bolder" }}>
                        Amount:
                      </Typography>
                    </span>
                    <span className="modal-text-detail">
                      <Typography variant="body1">
                        {numberToMoneyFormat(parseFloat(item.amount))}
                      </Typography>
                    </span>
                  </div>

                  <div className="modal-text-key-detail-pair">
                    <span className="modal-text-key">
                      <Typography variant="body1" sx={{ fontWeight: "bolder" }}>
                        Category:
                      </Typography>
                    </span>
                    <span className="modal-text-detail">
                      <Typography variant="body1">{item.category}</Typography>
                    </span>
                  </div>

                  <div className="modal-text-key-detail-pair">
                    <span className="modal-text-key">
                      <Typography variant="body1" sx={{ fontWeight: "bolder" }}>
                        Date Created:
                      </Typography>
                    </span>
                    <span className="modal-text-detail">
                      <Typography variant="body1">{item.date}</Typography>
                    </span>
                  </div>

                  <div className="modal-text-key-detail-pair">
                    <span className="modal-text-key">
                      <Typography variant="body1" sx={{ fontWeight: "bolder" }}>
                        ID:
                      </Typography>
                    </span>
                    <span className="modal-text-detail">
                      <Typography variant="body1">{item.id}</Typography>
                    </span>
                  </div>
                </div>
              );
            }
          })}
        </div>

        <div className="modal-btn-container">
          {/* <button className="btn" onClick={() => dispatch(modalNotSet())}>
            Exit
          </button> */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(modalNotSet())}
          >
            Exit
          </Button>
          {/* <button className="btn" onClick={deleteTransactionItem}>
            Delete Item
          </button> */}
          <Button
            variant="contained"
            color="error"
            onClick={deleteTransactionItem}
          >
            Delete Item
          </Button>
        </div>
      </Paper>

      {/* budget mukera */}

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

      {/* expense reset mukera */}
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

      {/* Overlay */}

      <div
        className="overlay"
        style={
          isModal || isexpenseReset || isbudgetReset
            ? {
                display: "block",
                backgroundColor: isDarkMode ? "white" : "black",
              }
            : {}
        }
        onClick={() => {
          dispatch(modalNotSet());
          dispatch(budgetNotReset());
          dispatch(expenseNotReset());
        }}
      ></div>
      {/* <div className="overlay" style={{backgroundColor:isDarkMode?"rgba(255,255,255,0.5):rgba(1,1,1,0.5)",display:isexpenseReset?"flex":""}}></div> */}
    </ThemeProvider>
  );
}
