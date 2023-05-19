import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  Alert,
  Collapse,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import { useReducer, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { signUpSchema } from "../../validationSchemas/SignUpValidation";
import { withoutAuth } from "@/lib/withoutAuth";
import { MAINRED } from "@/utils/consts";
import Layout from "@/components/layout/layout";
import styles from "./signup.module.scss";

const roles = ["Advertiser", "Promoter"];

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
    case "updateRole": {
      return {
        ...state,
        role: action.role,
      };
    }
    case "clearState": {
      return {
        email: "",
        password: "",
        role: "",
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
  role: "",
  serverError: "",
};

function SignUp() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [serverError, setServerError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, signUpDetails);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
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

  const handleRoleChange = (e: any) => {
    dispatch({
      type: "updateRole",
      role: e.target.value,
    });
  };

  const submitForm = async (e: any) => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: state.email,
      password: state.password,
      options: {
        data: {
          role: state.role,
        },
      },
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
                  Create a new account
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
                  autoComplete="new-password"
                  value={state.password}
                  onChange={(e) => handlePasswordChange(e)}
                />
              </Grid>
              <Grid item xs={12} className={styles.gridItemInput}>
                <FormControl>
                  <FormLabel id="role">Role *</FormLabel>
                  <RadioGroup
                    value={state.role}
                    onChange={(e) => handleRoleChange(e)}
                  >
                    {roles.map((role, index) => (
                      <FormControlLabel
                        {...register("role")}
                        key={index}
                        value={role}
                        control={<Radio />}
                        label={role}
                      />
                    ))}
                  </RadioGroup>
                  <FormHelperText style={{ color: MAINRED }}>
                    {errors?.role?.message?.toString()}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} className={styles.gridItemButton}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleSubmit(submitForm)}
                >
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
            </>
          )}
        </Grid>
      </form>
    </Container>
  );
}

const WrappedSignUp = withoutAuth(SignUp, "/dashboard");

export default function SignUpPage() {
  return (
    <Layout>
      <WrappedSignUp />
    </Layout>
  );
}
