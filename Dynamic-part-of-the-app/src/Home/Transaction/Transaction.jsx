import { Paper } from "@mui/material";
import { PieChartDisplay } from "./PieChartDisplay";
import { TransactionHistory } from "./TransactionHistory";

export function Transaction() {
  return (
    <>
      <Paper
        className="transaction-history-container"
        elevation={1}
        square
        sx={{ boxShadow: "none" }}
      >
        <TransactionHistory />

        <PieChartDisplay />
      </Paper>
    </>
  );
}
