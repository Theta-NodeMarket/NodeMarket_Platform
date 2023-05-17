import CircularProgress from "@mui/material/CircularProgress";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

export const withoutAuth = (Component: FC, redirectLink = "/dashboard") => {
  const AuthenticatedComponent: FC = (props) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const user = useUser();

    useEffect(() => {
      const checkUser = async () => {
        // if user exists, redirect
        if (user) await router.replace(redirectLink);
        setLoading(false);
      };
      checkUser();
    }, [router, user]);
    // while checking for user, display spinner
    if (loading) return <CircularProgress color="primary" />;
    // if there is not a user, render component
    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};
