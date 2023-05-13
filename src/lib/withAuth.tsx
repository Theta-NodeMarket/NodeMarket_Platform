import CircularProgress from "@mui/material/CircularProgress";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

export const withAuth = (Component: FC, redirectLink: string = "/sign-in") => {
  const AuthenticatedComponent: FC = (props) => {
    const [loading, setLoading] = useState(true);
    const supabase = useSupabaseClient();
    const router = useRouter();

    useEffect(() => {
      const checkUser = async () => {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        // if there is not a user, redirect
        if (!user) return router.replace(redirectLink);
        setLoading(false);
        checkUser();
      };
    }, [router, supabase.auth]);
    // while checking for user, display spinner
    if (!loading) return <CircularProgress color="primary" />;
    // if there is a user, render component
    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};
