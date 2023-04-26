import Layout from "@/components/layout/layout";
import SignIn from "./signin";
import React, { useEffect, useState } from "react";
import { AuthControl } from "../api/AuthController";
import { useRouter } from "next/router";

export default function SignInPage() {
  const router = useRouter();

  useEffect(() => {
    async function ValidateUser() {
      const { user } = await AuthControl.GetUser();
      console.log(user);

      if(user === null || user === undefined)
      {
        return;
      }

      router.push("/dashboard");
    }

    ValidateUser();
  }, [router]);


  return (
    <Layout>
      <SignIn />
    </Layout>
  );
}
