import { Link } from "react-router-dom";

import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Add, Category, Home, Update } from "@mui/icons-material";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Button
            LinkComponent={Link}
            to="/"
            variant="text"
            startIcon={<Home />}
          >
            HOME
          </Button>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <Button
            LinkComponent={Link}
            to="/expense"
            variant="text"
            startIcon={<Add />}
          >
            ADD AN EXPENSE
          </Button>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <Button
            LinkComponent={Link}
            to="/budget"
            variant="text"
            startIcon={<Update />}
          >
            ADD/UPDATE YOUR BUDGET
          </Button>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <Button
            LinkComponent={Link}
            to="/category"
            variant="text"
            startIcon={<Category />}
          >
            VIEW SPENDING IN CATEGORIES
          </Button>
        </MenuItem>
      </Menu>
    </div>
  );
}
