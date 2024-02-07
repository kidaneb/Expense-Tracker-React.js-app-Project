import { Paper } from "@mui/material";
import { Header } from "./Header/Header";
import { NavBar } from "./NavBar";
import { Outlet } from "react-router-dom";

export function PageContainer() {
  return (
    <>
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
    </>
  );
}
