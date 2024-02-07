import { useEffect, useRef, useState } from "react";
import { ExpenseTrackerChart } from "../ExpenseTrackerChart";
import { useDispatch, useSelector } from "react-redux";
import { setBudget } from "../Features/budget";
import { setExpense } from "../Features/expense";
import { modalSet } from "../Features/modal";
import { setTransactionItemId } from "../Features/transactionItemId";
import { Card, Paper, Typography } from "@mui/material";

export function Home() {
  //BUDGET RELATED DECLARATIONS

  const infoArray = useSelector((state) => state.infoArray.value);
  const budgetItemsArray = useSelector((state) => state.budgetArray.value);
  const undoBudgetArray = useSelector((state) => state.undoBudgetArray.value);
  const budgetRef = useRef(0);
  const budget = useSelector((state) => state.budget.value);

  // EXPENSE RELATED DECLARATIONS

  const expenseItemsArray = useSelector((state) => state.expenseArray.value);
  const expenseRef = useRef(0);
  const expense = useSelector((state) => state.expense.value);

  //CURRENT BALANCE DECLARATION

  const [currentBalance, setCurrentBalance] = useState(0);

  //MODAL RELATED DECLARATION

  const isModal = useSelector((state) => state.isModal.value);
  const transactionItemId = useSelector(
    (state) => state.transactionItemId.value
  );

  //

  const dispatch = useDispatch();

  // BUDGET RELATED EFFECTS

  useEffect(() => {
    localStorage.setItem("infoArray", JSON.stringify(infoArray));
  }, [infoArray]);

  //
  // SETTING THE BUDGET ITEMS ARRAY TO THE LOCAL STORAGE

  useEffect(() => {
    localStorage.setItem("BudgetItemsArray", JSON.stringify(budgetItemsArray));
  }, [budgetItemsArray]);

  // CALCULATING AND SETTING THE CURRENT BUDGET

  useEffect(() => {
    let currentBudget = 0;

    for (const item of budgetItemsArray) {
      if (item.type === "Added Budget") {
        currentBudget += parseFloat(item.amount);
      } else if (item.type === "Budget") {
        currentBudget += parseFloat(item.amount);
        break;
      }
    }
    dispatch(setBudget(currentBudget));
  }, [budgetItemsArray]);

  // SET THE EXPENSE ITEMS ARRAY TO THE LOCAL STORAGE

  useEffect(() => {
    localStorage.setItem(
      "ExpenseItemsArray",
      JSON.stringify(expenseItemsArray)
    );
  }, [expenseItemsArray]);

  // CALCULATING THE CURRENT EXPENSE
  useEffect(() => {
    if (expenseItemsArray.length !== 0) {
      const currentExpense = expenseItemsArray.reduce((sum, item) => {
        return sum + parseFloat(item.amount);
      }, 0);
      // setExpense((ce) => parseFloat(currentExpense));
      dispatch(setExpense(parseFloat(currentExpense)));
    } else {
      // setExpense((ce) => parseFloat(0));
      dispatch(setExpense(parseFloat(0)));
    }
  }, [expenseItemsArray]);

  // TO SET THE BUDGET TO THE DISPLAY

  useEffect(() => {
    budgetRef.current.textContent = numberToMoneyFormat(budget);
  }, [budget]);

  // SET THE EXPENSE TO THE DISPLAY

  useEffect(() => {
    expenseRef.current.textContent = numberToMoneyFormat(expense);
  });

  // CURRENT BALANCE CALCULATION

  useEffect(() => {
    setCurrentBalance((cb) => budget - expense);
  }, [budget, expense]);

  // FUNCTION FOR CLICKED TRANSACTION FROM TRANSACTION HISTORY

  function transactionClicked(id) {
    dispatch(modalSet());
    dispatch(setTransactionItemId(id));
  }
  // FUNCTION TO CONVERT NUMBER INTO MONEY FORMAT

  function numberToMoneyFormat(number) {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    });
  }

  // DATA DECLARATION AND SOME LOGIC USED FOR THE PIE CHART

  const data = [
    { id: 0, value: parseFloat(expense), label: "Total Expense", color: "red" },
    {
      id: 1,
      value: parseFloat(currentBalance),
      label: "Remaining Budget",
      color: "blue",
    },
  ];
  let valueSum;
  useEffect(() => {
    valueSum = data.reduce((sum, item) => {
      return sum + parseFloat(item.value);
    }, 0);
  }, [data]);

  //

  return (
    <>
     
      <Paper className="current-balance" square elevation={5}>
        <Typography className="current-balance-text" sx={{ fontSize: "2rem" }}>
          Your Current Balance is {numberToMoneyFormat(currentBalance)}
        </Typography>
      </Paper>


      <Paper className="budget-expense-display" square elevation={1}>
        <Card className="budget-display" elevation={5}>
          <Typography className="budget-title" sx={{ fontSize: "2rem" }}>
            Budget
          </Typography>
          <Typography
            className="budget-value"
            sx={{ fontSize: "2rem" }}
            ref={budgetRef}
          ></Typography>
        </Card>

        <Card className="expense-display" elevation={5}>
          <Typography className="expense-title" sx={{ fontSize: "2rem" }}>
            Expense
          </Typography>
          <Typography
            className="expense-value"
            sx={{ fontSize: "2rem" }}
            ref={expenseRef}
          ></Typography>
        </Card>
      </Paper>

      <Paper
        className="transaction-history-container"
        elevation={1}
        square
        sx={{ boxShadow: "none" }}
      >
        <Paper className="transaction-history" elevation={5} square>
          <div className="transaction-history-title">
            <Typography sx={{ fontSize: "1.5rem" }}>
              Transaction History
            </Typography>
          </div>

          <Paper
            className="transaction-list"
            elevation={5}
            square={false}
            sx={{
              boxShadow: "none",
            }}
          >
            {infoArray.map((transaction) => {
              return (
                <Card
                  elevation={20}
                  className="transaction-list-item"
                  sx={{
                    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
                  }}
                  key={transaction.id}
                  onClick={() => transactionClicked(transaction.id)}
                  style={
                    transaction.category === "Budget" ||
                    transaction.category === "Expense Reset"
                      ? { borderRight: " 5px solid rgb(18, 230, 78)" }
                      : { borderRight: "5px solid red" }
                  }
                >
                  <div className="transaction-item-label">
                    <Typography>{transaction.label}</Typography>
                  </div>

                  <div
                    className="transaction-item-amount"
                    style={
                      transaction.category === "Budget" ||
                      transaction.category === "Expense Reset"
                        ? { color: "rgb(18, 230, 78)" }
                        : { color: "red" }
                    }
                  >
                    <Typography>
                      {transaction.category === "Budget" ||
                      transaction.category === "Expense Reset"
                        ? "+"
                        : "-"}
                    {numberToMoneyFormat(parseFloat(transaction.amount))}
                    </Typography>
                  </div>
                </Card>
              );
            })}
          </Paper>
        </Paper>

        <Paper className="pichart-display" elevation={5} square>
          {valueSum !== 0 && <ExpenseTrackerChart data={data} />}
        </Paper>
      </Paper>
    </>
  );
}
