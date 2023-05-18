import CircularProgress from "@mui/material/CircularProgress";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

export const withAuth = <T extends {}>(
  Component: FC<T>,
  redirectLink?: string
) => {
  const AuthenticatedComponent: FC<T> = (props) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const user = useUser();

    useEffect(() => {
      const checkUser = async () => {
        // if there is not a user, redirect
        if (!user) await router.replace(redirectLink ?? window.location);
        setLoading(false);
      };
      checkUser();
    }, [router, user]);
    // while checking for user, display spinner
    if (loading) return <CircularProgress color="primary" />;
    // if there is a user, render component
    return <Component {...(props as T)} />;
  };

  return AuthenticatedComponent;
};
