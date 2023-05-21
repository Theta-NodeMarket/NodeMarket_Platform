import CircularProgress from "@mui/material/CircularProgress";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

export enum type {
  ad = "8fc630e188c55cd1df8d1125e3b642f78196da44b1767aa1581355f03b2bc649",
}

export const withApproval = <T extends {}>(
  Component: FC<T>,
  type: type,
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
        if (!user || user.user_metadata?.type !== type)
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
