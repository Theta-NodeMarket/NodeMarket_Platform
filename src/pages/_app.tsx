import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useState } from "react";
import type { AppProps } from "next/app";
import { supabase } from "../lib/initSupabase";
import { Auth } from "@supabase/auth-ui-react";
import theme from "@/styles/theme";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <ThemeProvider theme={theme}>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <CssBaseline />
        <Component {...pageProps} />
      </Auth.UserContextProvider>
    </ThemeProvider>
  );
}
