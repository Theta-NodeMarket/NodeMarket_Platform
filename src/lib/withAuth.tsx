import CircularProgress from "@mui/material/CircularProgress";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

export const withAuth = (Component: FC, redirectLink: string = "/sign-in") => {
  const AuthenticatedComponent: FC = (props) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const user = useUser();

    useEffect(() => {
      const checkUser = async () => {
        // if there is not a user, redirect
        if (!user) await router.replace(redirectLink);
        setLoading(false);
      };
      checkUser();
    }, [router, user]);
    // while checking for user, display spinner
    if (loading) return <CircularProgress color="primary" />;
    // if there is a user, render component
    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};
