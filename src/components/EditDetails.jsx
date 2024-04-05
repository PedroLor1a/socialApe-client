import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import { editUserDetails, userLogged } from "../redux/actions";
import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MyButton from "../util/MyButton";
const styles = {
  button: {
    float: "right",
  },
};

const EditDetails = ({ classes }) => {
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const credentials = useSelector((state) => state.credentials);

  const mapUserDetailsToState = (credentials) => {
    const data = credentials?.credentials;
    setBio(data?.bio ? data?.bio : "");
    setWebsite(data?.website ? data?.website : "");
    setLocation(data?.location ? data?.location : "");
  };

  const handleOpen = () => {
    setOpen(true);
    mapUserDetailsToState(credentials);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const token = localStorage.getItem("FBIdToken");

  const handleSubmit = () => {
    const userDetails = {
      bio: bio,
      website: website,
      location: location,
    };
    dispatch(editUserDetails(userDetails, token));
    handleClose();
    window.location.reload();
  };
  //   dispatch(userLogged());
  useEffect(() => {
    mapUserDetailsToState(credentials);
  }, [dispatch]);

  return (
    <Fragment>
      <MyButton
        tip="Edit Details"
        onClick={handleOpen}
        btnClassName={classes.button}>
        <EditIcon color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              className={classes.textField}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              fullWidth
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Your website"
              className={classes.textField}
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              fullWidth
            />{" "}
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Where you live"
              className={classes.textField}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

EditDetails.protoTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditDetails);
