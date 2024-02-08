import { Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { TransactionHistoryList } from "./TransactionHistoryList";

export function TransactionHistory() {
  const infoArray = useSelector((state) => state.infoArray.value);

  return (
    <>
      <Paper className="transaction-history" elevation={5} square>
        <div className="transaction-history-title">
          <Typography sx={{ fontSize: {xl:"1.5rem",xs:"1.5rem"} }}>
            Transaction History
          </Typography>
        </div>

        <TransactionHistoryList />
      </Paper>
    </>
  );
}
