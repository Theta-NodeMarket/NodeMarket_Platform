import Layout from "@/components/layout";
import React, { use, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import styles from "./index.module.scss";

export default function learnMorePage() {
  const session = useSession();
  const supabase = useSupabaseClient();

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    console.log(session);

    if (session == null) console.log("test");
  }, [session]);

  return (
    <Layout>
      <div className={styles.container}>
        {!session ? (
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={[]}
            theme="dark"
          />
        ) : (
          <p>Account page will go here.</p>
        )}
      </div>
    </Layout>
  );
}
