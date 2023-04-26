import Layout from "@/components/layout/layout";
import {CircularProgress} from "@mui/material";
import { useState, useEffect } from "react";
import { AuthControl } from "../api/AuthController";
import { useRouter } from "next/router";
import SignUp from "./signup";

function Content({ loading, setLoading }: any) {
  if (loading) {
    return <div style={{width: "100vw", display: "flex", justifyContent: "center"}}><CircularProgress color="primary"/></div>;
  }
  return <SignUp setLoading={setLoading}/>;
}

export default function SignUpPage() {
  const router = useRouter();
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    async function ValidateUser() {
      const { user } = await AuthControl.GetUser();
      console.log(user);

      if(user === null || user === undefined)
      {
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    }

    ValidateUser();
  }, [router]);

  return (
    <Layout>
      <Content loading={Loading} setLoading={setLoading}/>
    </Layout>
  );
}
