import { Paper } from "@mui/material";
import { ExpenseTrackerChart } from "../../ExpenseTrackerChart";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export function PieChartDisplay() {
  const budget = useSelector((state) => state.budget.value);
  const expense = useSelector((state) => state.expense.value);

  // DATA DECLARATION AND SOME LOGIC USED FOR THE PIE CHART

  const data = [
    { id: 0, value: parseFloat(expense), label: "Total Expense", color: "red" },
    {
      id: 1,
      value: parseFloat(budget - expense),
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

  return (
    <>
      <Paper className="pichart-display" elevation={5} square>
        {valueSum !== 0 && <ExpenseTrackerChart data={data} />}
      </Paper>
    </>
  );
}
