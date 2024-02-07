import { Button, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { DarkMode, LightMode } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "./Features/isDarkMode";
import BasicMenu from "./HeaderMenu";


export function Header() {
  const isDarkMode = useSelector((state) => state.darkMode.value);
  const dispatch = useDispatch();
  return (
    <>
      <Paper square variant="elevation" elevation={5}>
        <Toolbar
          className="header"
          style={
            isDarkMode
              ? { borderBottom: "1px solid white" }
              : { borderBottom: "1px solid black" }
          }
        >
          <div>
            {/* <IconButton aria-label="menu" LinkComponent={Link} to="/menu">
              <MenuIcon />
            </IconButton> */}
            <BasicMenu/>
          </div>
          <div>
            <Typography variant="h6">Expense Tracker</Typography>
          </div>
          <div>
            <Button
              color="primary"
              startIcon={isDarkMode ? <LightMode /> : <DarkMode />}
              onClick={() => dispatch(toggleDarkMode())}
            >
              {isDarkMode ? `Light` : `Dark`}
            </Button>
          </div>
        </Toolbar>
      </Paper>
    </>
  );
}
