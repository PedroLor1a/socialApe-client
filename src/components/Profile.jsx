import { withStyles } from "@mui/styles";
import { Button, Paper } from "@mui/material";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import LocationOn from "@mui/icons-material/LocationOn";
import LinkIcon from "@mui/icons-material/Link";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EditIcon from "@mui/icons-material/Edit";
import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { userLogged, uploadImage, logoutUser } from "../redux/actions";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { KeyboardReturn } from "@mui/icons-material";
import EditDetails from "./EditDetails";
import MyButton from "../util/MyButton";

const styles = {
  paper: {
    padding: 20,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: "#00bcd4",
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
};

const Profile = ({ classes }) => {
  const user = useSelector((state) => state.credentials);
  const dispatch = useDispatch();

  let token = localStorage.getItem("FBIdToken");

  const verifyUserLogged = () => {
    if (token) {
      dispatch(userLogged(token));
    } else {
      return console.log("NO EXISTE USUARIO CON ESE TOKEN");
    }
  };

  useEffect(() => {
    verifyUserLogged();
  }, []);

  const userLogg = user?.credentials;

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    dispatch(uploadImage(formData, token));
    window.location.reload();
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      {token ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img
                src={userLogg?.imageUrl}
                alt="userimg"
                className="profile-image"
              />
              <input
                type="file"
                id="imageInput"
                onChange={handleImageChange}
                hidden="hidden"
              />
              <MyButton
                tip="Edit profile picture"
                onClick={handleEditPicture}
                btnClassName="button">
                <EditIcon color="primary" />
              </MyButton>
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink
                component={Link}
                to={`/users/${userLogg?.name}`}
                color="primary"
                variant="h5">
                @{userLogg?.name}
              </MuiLink>
              <hr />
              {userLogg?.bio && (
                <Typography variant="body2">{userLogg?.bio}</Typography>
              )}
              <hr />
              {userLogg?.location && (
                <Fragment>
                  <LocationOn color="primary" />{" "}
                  <span>{userLogg?.location}</span>
                  <hr />
                </Fragment>
              )}
              {userLogg?.website && (
                <Fragment>
                  <LinkIcon color="primary" />
                  <a
                    href={userLogg?.website}
                    target="_blank"
                    rel="noopener noreferrer">
                    {userLogg?.website}
                  </a>
                  <hr />
                </Fragment>
              )}
              <CalendarTodayIcon color="primary" />
              <span>
                Joined {dayjs(userLogg?.createdAt).format("MMM YYYY")}
              </span>
            </div>
            <MyButton tip="Logout" onClick={handleLogout}>
              <KeyboardReturn color="primary" />
            </MyButton>
            <EditDetails />
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body" align="center">
            No profile found, please login again
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login">
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/signup">
              Signup
            </Button>
          </div>
        </Paper>
      )}
    </div>
  );
};

Profile.protoTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);
