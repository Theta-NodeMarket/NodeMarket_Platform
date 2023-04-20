import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#5CC542",
    },
    secondary: {
      main: "#FFA500",
    },
    error: {
      main: "#FF0000",
    },
    warning: {
      main: "#EEF22A",
    },
    text: {
      primary: "#fafafa",
    },
    background: {
      default: "#181818",
      paper: "#181818",
    },
    info: {
      main: "#4072B4",
    },
  },
});

export default theme;
