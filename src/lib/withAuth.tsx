import CircularProgress from "@mui/material/CircularProgress";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

export const withAuth = <T extends {}>(
  Component: FC<T>,
  redirectLink: string
) => {
  const AuthenticatedComponent: FC<T> = (props) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const supabase = useSupabaseClient();

    useEffect(() => {
      const checkUser = async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        // if there is not a user, redirect
        if (!user) await router.replace(redirectLink ?? window.location);
        else setLoading(false);
      };
      checkUser();
    }, [router, supabase.auth]);
    // while checking for user, display spinner
    if (loading) return <CircularProgress color="primary" />;
    // if there is a user, render component
    return <Component {...(props as T)} />;
  };

  return AuthenticatedComponent;
};
