import { Paper, Typography } from "@mui/material";

export function CurrentBalance({ numberToMoneyFormat, currentBalance }) {
  return (
    <>
      <Paper className="current-balance" square elevation={5} >
        <Typography className="current-balance-text" sx={{ fontSize: {xl:"2rem",xs:"1rem"} }}>
          Your Current Balance is {numberToMoneyFormat(currentBalance)}
        </Typography>
      </Paper>
    </>
  );
}
