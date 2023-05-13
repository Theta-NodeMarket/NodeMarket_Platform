import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  Alert,
  Collapse,
} from "@mui/material";
import Link from "next/link";
import styles from "./signup.module.scss";
import { useReducer, useState } from "react";
import { useRouter } from "next/router";
import { signUpSchema } from "../../validationSchemas/SignUpValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRedirectIfUser } from "@/hooks";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { withoutAuth } from "@/lib/withoutAuth";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "updateEmail": {
      return {
        ...state,
        email: action.email,
      };
    }
    case "updatePassword": {
      return {
        ...state,
        password: action.password,
      };
    }
    case "clearState": {
      return {
        email: "",
        password: "",
      };
    }
    case "updateServerError": {
      return {
        ...state,
        serverError: action.serverError,
      };
    }
    default:
      throw Error("Unknown action: " + action.type);
  }
};

const signUpDetails = {
  email: "",
  password: "",
  serverError: "",
};

function SignUp() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [serverError, setServerError] = useState(false);
  const [state, dispatch] = useReducer(reducer, signUpDetails);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  useRedirectIfUser();

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
    const { error } = await supabase.auth.signUp({
      email: state.email,
      password: state.password,
    });

    if (error !== null) {
      setServerError(true);
      dispatch({
        type: "updateServerError",
        serverError: error.message,
      });

      setTimeout(() => {
        setServerError(false);
      }, 5000);
      return;
    }
    setServerError(false);
    dispatch({
      type: "clearState",
    });
    // success... navigate away to dashboard
    router.push("/dashboard");
  };

  return (
    <Container maxWidth={"sm"}>
      <form onSubmit={handleSubmit(submitForm)}>
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
              {...register("email")}
              error={errors?.email?.message != null}
              helperText={errors?.email?.message?.toString()}
              id="email"
              label="Email address"
              variant="standard"
              required
              fullWidth
              autoComplete="email"
              value={state.email}
              onChange={(e) => handleEmailChange(e)}
            />
          </Grid>
          <Grid item xs={12} className={styles.gridItemInput}>
            <TextField
              {...register("password")}
              error={errors?.password?.message != null}
              helperText={errors?.password?.message?.toString()}
              id="password"
              label="Password"
              type="password"
              variant="standard"
              required
              fullWidth
              autoComplete="new-password"
              value={state.password}
              onChange={(e) => handlePasswordChange(e)}
            />
          </Grid>
          <Grid item xs={12} className={styles.gridItemButton}>
            <Button variant="contained" fullWidth type="submit">
              Sign Up
            </Button>
          </Grid>
          <Grid item xs={12} className={styles.gridItemHeadingAndLink}>
            <Link className={styles.signInLink} href="/sign-in">
              Already have an account?
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Collapse in={serverError}>
              <Alert severity="error">{state.serverError}</Alert>
            </Collapse>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default withoutAuth(SignUp, "/dashboard");
