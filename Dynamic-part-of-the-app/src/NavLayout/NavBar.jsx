import { Add, Category, Home, Update } from "@mui/icons-material";
import { Button, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function NavBar() {
  const isDarkMode = useSelector((state) => state.darkMode.value);
  return (
    <>
      <Paper
        className="navbar"
        style={
          isDarkMode
            ? { borderRight: "1px solid white" }
            : { borderRight: "1px solid black" }
        }
        variant="elevation"
        elevation={5}
        square
      >
        <nav>
          <div>
            <Button
              LinkComponent={Link}
              to="/"
              variant="text"
              startIcon={<Home />}
            >
              HOME
            </Button>
          </div>
          <div>
            <Button
              LinkComponent={Link}
              to="/expense"
              variant="text"
              startIcon={<Add />}
            >
              Add an Expense
            </Button>
          </div>
          <div>
            <Button
              LinkComponent={Link}
              to="/budget"
              variant="text"
              startIcon={<Update />}
            >
              Add/Update your budget
            </Button>
          </div>
          <div>
            <Button
              LinkComponent={Link}
              to="/category"
              variant="text"
              startIcon={<Category />}
            >
              View Spending in Categories
            </Button>
          </div>
        </nav>
      </Paper>
    </>
  );
}
