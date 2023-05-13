import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useUser } from "@supabase/auth-helpers-react";

export interface UseProtectedRouteOptions {
  redirectPath: string;
}

export function useRedirectIfNotUser(
  { redirectPath }: UseProtectedRouteOptions = {
    redirectPath: "/sign-in",
  }
) {
  const [authLoading, setAuthLoading] = useState(true);
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    async function validateUser() {
      if (user === null || user === undefined) {
        router.replace(redirectPath);
        return;
      }
      setAuthLoading(false);
    }

    validateUser();
  }, [user, router, redirectPath]);

  return { authLoading, setAuthLoading, user };
}

export function useRedirectIfUser(
  { redirectPath }: UseProtectedRouteOptions = {
    redirectPath: "/dashboard",
  }
) {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    async function validateUser() {
      if (user === null || user === undefined) {
        return;
      }
      router.replace(redirectPath);
    }

    validateUser();
  }, [user, router, redirectPath]);
}
