import { Card, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { numberToMoneyFormat } from "../../Features/numberToMoney";
import { modalSet } from "../../Features/modal";
import { setTransactionItemId } from "../../Features/transactionItemId";

export function TransactionHistoryList() {
  const infoArray = useSelector((state) => state.infoArray.value);
    const dispatch = useDispatch();
  // FUNCTION FOR CLICKED TRANSACTION FROM TRANSACTION HISTORY

  function transactionClicked(id) {
    dispatch(modalSet());
    dispatch(setTransactionItemId(id));
  }

  return (
    <>
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
              style={
                transaction.category === "Budget" ||
                transaction.category === "Expense Reset"
                  ? { borderRight: " 5px solid rgb(18, 230, 78)" }
                  : { borderRight: "5px solid red" }
              }
              key={transaction.id}
              onClick={() => transactionClicked(transaction.id)}
            >
              <div className="transaction-item-label">
                <Typography>{transaction.label}</Typography>
              </div>

              <Typography
                style={
                  transaction.category === "Budget" ||
                  transaction.category === "Expense Reset"
                    ? { color: "rgb(18, 230, 78)" }
                    : { color: "red" }
                }
              >
                {transaction.category === "Budget" ||
                transaction.category === "Expense Reset"
                  ? "+"
                  : "-"}
                {numberToMoneyFormat(parseFloat(transaction.amount))}
              </Typography>
            </Card>
          );
        })}
      </Paper>
    </>
  );
}
