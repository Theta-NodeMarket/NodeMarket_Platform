import CircularProgress from "@mui/material/CircularProgress";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

export enum Roles {
  Advertiser = "Advertiser",
  Promoter = "Promoter",
}

export const withRole = <T extends {}>(
  Component: FC<T>,
  role: Roles,
  redirectLink: string
) => {
  const WrappedComponent: FC<T> = (props) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const supabase = useSupabaseClient();

    useEffect(() => {
      const checkRole = async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user || user.user_metadata?.role !== role)
          return await router.replace(redirectLink);
        setLoading(false);
      };
      checkRole();
    }, [router, supabase.auth]);
    // while checking for user, display spinner
    if (loading) return <CircularProgress color="primary" />;
    // if there is a user, render component
    return <Component {...(props as T)} />;
  };
  return WrappedComponent;
};
