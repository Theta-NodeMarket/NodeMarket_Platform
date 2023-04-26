import {Button, CircularProgress} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AuthControl } from "../api/AuthController";
import { useRouter } from "next/router";

function Content({ loading }: any) {
  if (loading) {
    return <div style={{width: "100vw", display: "flex", justifyContent: "center"}}><CircularProgress color="primary"/></div>;
  }
  return <Button variant="contained">You are logged in</Button>;
}

export default function DashboardPage() {
  const [Loading, setLoading] = useState(true);
  const router = useRouter();

  // Route protection
  useEffect(() => {
    async function ValidateUser() {
      const { user } = await AuthControl.GetUser();
      console.log(user);

      if(user === null || user === undefined)
      {
        router.push("/sign-in");
        return;
      }
      else
      {
        setLoading(false);
      }
    }

    ValidateUser();
  }, [router]);

  return (
    <Content loading={Loading}/>
  );
}