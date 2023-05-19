import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  Alert,
  Collapse,
  CircularProgress,
} from "@mui/material";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { signInSchema } from "../../validationSchemas/SignInValidation";
import { withoutAuth } from "@/lib/withoutAuth";
import Layout from "@/components/layout/layout";
import styles from "./signin.module.scss";

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

const signInDetails = {
  email: "",
  password: "",
  serverError: "",
};

function SignIn() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [serverError, setServerError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, signInDetails);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

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
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: state.email,
      password: state.password,
    });

    if (error !== null) {
      setLoading(false);
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
      <form>
        <Grid
          container
          className={styles.signUpGrid}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          {loading ? (
            <CircularProgress color="primary" />
          ) : (
            <>
              <Grid item xs={12} className={styles.gridItemHeadingAndLink}>
                <Typography variant="h4" className={styles.heading}>
                  Sign In
                </Typography>
              </Grid>
              <Grid item xs={12} className={styles.gridItemInput}>
                <TextField
                  {...register("email")}
                  error={errors?.email?.message != null}
                  helperText={errors?.email?.message?.toString()}
                  id="email"
                  label="Email address *"
                  variant="standard"
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
                  label="Password *"
                  type="password"
                  variant="standard"
                  fullWidth
                  autoComplete="current-password"
                  value={state.password}
                  onChange={(e) => handlePasswordChange(e)}
                />
              </Grid>
              <Grid item xs={12} className={styles.gridItemButton}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleSubmit(submitForm)}
                >
                  Sign In
                </Button>
              </Grid>
              <Grid item xs={6} className={styles.gridItemHeadingAndLink}>
                <Button variant="outlined" type="button" href="/sign-up">
                  Create new account
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Collapse in={serverError}>
                  <Alert severity="error">{state.serverError}</Alert>
                </Collapse>
              </Grid>
            </>
          )}
        </Grid>
      </form>
    </Container>
  );
}

const WrappedSignIn = withoutAuth(SignIn, "/dashboard");

export default function SignInPage() {
  return (
    <Layout>
      <WrappedSignIn />
    </Layout>
  );
}
