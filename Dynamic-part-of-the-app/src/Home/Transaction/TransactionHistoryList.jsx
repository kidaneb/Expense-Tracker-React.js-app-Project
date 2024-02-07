import { Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { modalSet } from "../../Features/modal";
import { setTransactionItemId } from "../../Features/transactionItemId";
import { TransactionHistoryItem } from "./TransactionHistoryItem";

export function TransactionHistoryList() {
  const infoArray = useSelector((state) => state.infoArray.value);
  const dispatch = useDispatch();
  // FUNCTION FOR CLICKED TRANSACTION FROM TRANSACTION HISTORY

  

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
            <TransactionHistoryItem
              transaction={transaction}
              key={transaction.id}
            />
          );
        })}
      </Paper>
    </>
  );
}
