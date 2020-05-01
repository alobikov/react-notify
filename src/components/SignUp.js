import React, { useContext } from "react";
import logo from "../assets/logo-bohnenkamp.svg";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { FormHelperText } from "@material-ui/core";
import LinearIndeterminate from "../LinearIndeterminate";
import { GlobalContext } from "../context/GlobalState";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const indicatorStyle = {
  color: "red",
  textAlign: "center",
  height: 20,
  marginTop: 5,
  marginBottom: "auto",
};

export default function SignUp() {
  console.log("***SignUp called***");
  const classes = useStyles();
  const [values, setValues] = React.useState({
    username: "",
    password: "",
    email: "",
    sessionToken: "",
    objectId: "",
    signupError: "",
  });
  const [isLoading, setLoading] = React.useState(false);
  const [isSignin, setSignin] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const [errors, setErrors] = React.useState({
    usernameError: "",
    emailError: "",
    passwordError: "",
  });

  // interchangable view component
  // show is same size box either loading indicator or error message
  const LoadingOrError = (props) => {
    if (props.isLoading) {
      return <LinearIndeterminate />;
    } else if (props.signupError !== "") {
      return <div>{props.signupError}</div>;
    }
    return <div></div>;
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const toggleMode = () => {
    setSignin(!isSignin);
  };
  const signUpCallBack = (result) => {
    if (typeof result == "string") {
      setValues({ ...values, signupError: result });
    } else {
      const { username, email, sessionToken, objectId } = result;
      console.log("call back result: " + username + " " + sessionToken);
      setValues({
        ...values,
        username: username,
        email: email,
        sessionToken: sessionToken,
        objectId: objectId,
      });
      setLoading(false);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values.username, values.email, values.password);
    signUpSubmitted(
      values.username,
      values.email,
      values.password,
      signUpCallBack
    );
    setLoading(true);
  };

  const handleChange = (prop) => (event) => {
    if (prop === "username") {
      validateUsername(event.target.value);
    } else if (prop === "email") {
      validateEmail(event.target.value);
    } else if (prop === "password") {
      validatePassword(event.target.value);
    }
    setValues({ ...values, [prop]: event.target.value });
  };

  const validateUsername = (username) => {
    if (username.length > 0 && username.length < 3) {
      setErrors({ ...errors, usernameError: "Username too short" });
    } else if (username.length === 0) {
      setErrors({ ...errors, usernameError: "" });
    } else {
      setErrors({ ...errors, usernameError: null });
    }
  };

  const validateEmail = (email) => {
    if (email.length > 3 && !email.includes("@")) {
      setErrors({ ...errors, emailError: "Not valid email address" });
    } else if (email.length === 0) {
      setErrors({ ...errors, emailError: "" });
    } else {
      setErrors({ ...errors, emailError: null });
    }
  };

  const validatePassword = (password) => {
    if (password.length > 0 && password.length < 6) {
      setErrors({ ...errors, passwordError: "Password too short" });
    } else if (password.length === 0) {
      setErrors({ ...errors, passwordError: "" });
    } else {
      setErrors({ ...errors, passwordError: null });
    }
  };

  //! Global Context Pulls
  const { user } = useContext(GlobalContext);
  console.log(user);
  const { signUpSubmitted } = useContext(GlobalContext);

  console.log("SignUp rendered!");

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={logo} style={{ width: 200 }} alt="logotip"></img>
        <div style={{ height: 20 }}></div>
        <Typography component="h1" variant="h5">
          {isSignin ? "Sign in" : "Create your account"}
        </Typography>

        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            {isSignin ? (
              <div></div>
            ) : (
              <Grid item xs={12}>
                <FormControl
                  error={!!errors.usernameError}
                  fullWidth
                  className={clsx(classes.margin, classes.textField)}
                  variant="outlined"
                >
                  <InputLabel htmlFor="username">Username</InputLabel>
                  <OutlinedInput
                    id="username"
                    value={values.username}
                    onChange={handleChange("username")}
                    labelWidth={73}
                  />
                  <FormHelperText>{errors.usernameError}</FormHelperText>
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12}>
              <FormControl
                id="f-email"
                focused={values.isEmailFocus}
                error={!!errors.emailError}
                fullWidth
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
              >
                <InputLabel htmlFor="username">Email</InputLabel>
                <OutlinedInput
                  id="email"
                  value={values.email}
                  onChange={handleChange("email")}
                  labelWidth={42}
                />
                <FormHelperText>{errors.emailError}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl
                error={!!errors.passwordError}
                fullWidth
                variant="outlined"
                className={clsx(classes.margin, classes.textField)}
              >
                <InputLabel htmlFor="passwordas">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
                <FormHelperText>{errors.passwordError}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <div style={indicatorStyle}>
                <LoadingOrError
                  isLoading={isLoading}
                  signupError={values.signupError}
                />
              </div>
            </Grid>
          </Grid>
          <Button
            disabled={
              false
              // !(
              //   errors.usernameError === null &&
              //   errors.emailError === null &&
              //   errors.passwordError === null
              // )
            }
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignin ? "Sign In" : "Sign Up"}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              {isSignin ? (
                <Link onClick={toggleMode} href="#" variant="body2">
                  Don't have an account? Sign up
                </Link>
              ) : (
                <Link onClick={toggleMode} href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              )}
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
