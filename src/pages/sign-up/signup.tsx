import { TextField, Button, Grid, Container, Typography } from "@mui/material";
import Link from "next/link";
import styles from "./signup.module.scss";
import { useReducer } from "react";
import { AuthControl } from "../api/AuthController";
import { useRouter } from "next/router";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "updateEmail": {
      return {
        email: action.email,
        password: state.password,
      };
    }
    case "updatePassword": {
      return {
        email: state.email,
        password: action.password,
      };
    }
    case "clearState": {
      return {
        email: "",
        password: "",
      };
    }
    default:
      throw Error("Unknown action: " + action.type);
  }
};

const signUpDetails = {
  email: "",
  password: "",
};

export default function SignUp() {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, signUpDetails);

  const handleEmailChange = (e: any) => {
    dispatch({
      type: "updateEmail",
      email: e.target.value,
    });
  };

  const handlePasswordChange = (e: any) => {
    dispatch({
      type: "updatePassword",
      password: e.target.value,
    });
  };

  const submitForm = async (e: any) => {
    if (state.email && state.password) {
      const response = await AuthControl.SignUp(state.email, state.password);

      if (response.error !== null) {
        return;
      }

      dispatch({
        type: "clearState",
      });
      // success... navigate away to dashboard
      router.push("/dashboard");
    }
  };

  const validateForm = () => {};

  return (
    <Container maxWidth={"sm"}>
      <Grid
        container
        className={styles.signUpGrid}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} className={styles.gridItemHeadingAndLink}>
          <Typography variant="h4" className={styles.heading}>
            Create a new account
          </Typography>
        </Grid>
        <Grid item xs={12} className={styles.gridItemInput}>
          <TextField
            id="email"
            label="Email address"
            variant="standard"
            required
            fullWidth
            value={state.email}
            onChange={(e) => handleEmailChange(e)}
          />
        </Grid>
        <Grid item xs={12} className={styles.gridItemInput}>
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="standard"
            required
            fullWidth
            value={state.password}
            onChange={(e) => handlePasswordChange(e)}
          />
        </Grid>
        <Grid item xs={12} className={styles.gridItemButton}>
          <Button variant="contained" fullWidth onClick={submitForm}>
            Sign Up
          </Button>
        </Grid>
        <Grid item xs={12} className={styles.gridItemHeadingAndLink}>
          <Link className={styles.signInLink} href="/">
            Already have an account?
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}
