import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { AuthControl } from "../pages/api/AuthController";

export interface UseProtectedRouteOptions {
  redirectPath: string;
}

export function useRedirectIfNotUser(
  { redirectPath }: UseProtectedRouteOptions = {
    redirectPath: "/sign-in",
  }
) {
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function validateUser() {
      const { user } = await AuthControl.GetUser();
      setUser(user);
      if (user === null || user === undefined) {
        router.replace(redirectPath);
        return;
      }
      setAuthLoading(false);
    }

    validateUser();
  }, [router, redirectPath]);

  return { authLoading, setAuthLoading, user };
}

export function useRedirectIfUser(
  { redirectPath }: UseProtectedRouteOptions = {
    redirectPath: "/dashboard",
  }
) {
  const router = useRouter();

  useEffect(() => {
    async function validateUser() {
      const { user } = await AuthControl.GetUser();
      if (user === null || user === undefined) {
        return;
      }
      router.replace(redirectPath);
    }

    validateUser();
  }, [router, redirectPath]);
}
