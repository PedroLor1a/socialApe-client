import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";
import MyButton from "../util/MyButton";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
const Navbar = () => {
  const token = localStorage.getItem("FBIdToken");

  return (
    <AppBar>
      <Toolbar className="nav-container">
        {token ? (
          <Fragment>
            <MyButton tip="Post a Scream!">
              <AddIcon />
            </MyButton>
            <Link to="/">
              <MyButton tip="Home">
                <HomeIcon />
              </MyButton>
            </Link>
            <MyButton tip="Notifications">
              <NotificationsIcon />
            </MyButton>
          </Fragment>
        ) : (
          <Toolbar className="nav-container">
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </Toolbar>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
