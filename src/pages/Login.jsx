import { useState } from "react";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import AppIcon from "../images/monkey3.png";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";

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
  },
  customErorr: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10,
  },
};

const Login = ({ classes }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const userData = {
      email: email,
      password: password,
    };
    axios
      .post(
        "https://southamerica-east1-socialape-aef7b.cloudfunctions.net/api/login",
        userData
      )
      .then((res) => {
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setErrors(err.response.data);
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
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
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
          {errors?.general && (
            <Typography variant="body2" className={classes.customErorr}>
              {errors?.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}>
            Login
          </Button>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Login.protoTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
