import { Card, Typography } from "@mui/material";
import { numberToMoneyFormat } from "../../Features/numberToMoney";
import { useDispatch } from "react-redux";
import { setTransactionItemId } from "../../Features/transactionItemId";
import { modalSet } from "../../Features/modal";

export function TransactionHistoryItem({ transaction }) {
  const dispatch = useDispatch();
  function transactionClicked(id) {
    dispatch(modalSet());
    dispatch(setTransactionItemId(id));
  }
  return (
    <>
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
        onClick={() => transactionClicked(transaction.id)}
      >
        <div className="transaction-item-label">
          <Typography sx={{fontSize:{xs:"0.9rem"}}}>{transaction.label}</Typography>
        </div>

        <div className="transaction-item-amount">
          <Typography
            sx={{ margin: "1em" }}
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
        </div>
      </Card>
    </>
  );
}
