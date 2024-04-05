import { useState } from "react";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import AppIcon from "../images/monkey3.png";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const styles = {
  form: {
    textAlign: "center",
  },
  image: {
    maxWidth: 80,
    margin: "20px auto 20px auto",
  },
  pageTitle: {
    margin: "10px auto 20px auto",
  },
  textField: {
    margin: "10px auto 10px auto",
  },
  button: {
    marginTop: 20,
    position: "relative",
  },
  customErorr: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10,
  },
  progress: {
    position: "absolute",
  },
};
//! BUSCAR PORQUE CUANDO SE REFRESCA LA PAGINA SE VAN LOS ESTILOS DE LOS INPUT (MARGIN)
const Signup = ({ classes }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const newUserData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      name: name,
    };
    axios
      .post(
        "https://southamerica-east1-socialape-aef7b.cloudfunctions.net/api/signup",
        newUserData
      )
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
        setLoading(false);
        window.location.reload();
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        setErrors(err.response?.data);
      });
  };
  // const handleChange = (event) => {
  //   setEmail({ [event.target.name]: event.target.value });
  // };
  console.log(errors, "ESTADOS");
  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="monkey" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Signup
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="name"
            name="name"
            type="text"
            label="Name"
            helperText={errors?.name}
            erorr={errors?.name ? true : false}
            className={classes.textField}
            value={name}
            onChange={(e) => setName(e.target.value)}
            // onChange={handleChange}
            fullWidth
          />
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            helperText={errors?.email}
            erorr={errors?.email ? true : false}
            className={classes.textField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // onChange={handleChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            helperText={errors?.password}
            erorr={errors?.password ? true : false}
            className={classes.textField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // onChange={handleChange}
            fullWidth
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            helperText={errors?.confirmPassword}
            erorr={errors?.confirmPassword ? true : false}
            className={classes.textField}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            // onChange={handleChange}
            fullWidth
          />
          {errors?.general && (
            <Typography variant="body2" className={classes.customErorr}>
              {errors?.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disable={loading}>
            Signup
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            Already have an account ? login <Link to="/login">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Signup.protoTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);
