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
      paper: "#181818",
      default: "#181818",
    },
    info: {
      main: "#4072B4",
    },
  },
  typography: {
    h1: {
      color: "#FAFAFA",
    },
    h2: {
      color: "#FAFAFA",
    },
    h3: {
      color: "#FAFAFA",
    },
    h4: {
      color: "#FAFAFA",
    },
    h5: {
      color: "#FAFAFA",
    },
    h6: {
      color: "#FAFAFA",
    },
    subtitle1: {
      color: "#FAFAFA",
    },
    subtitle2: {
      color: "#FAFAFA",
    },
    body1: {
      color: "#FAFAFA",
    },
    body2: {
      color: "#FAFAFA",
    },
    caption: {
      color: "#FAFAFA",
    },
    overline: {
      color: "#FAFAFA",
    },
  },
});

export default theme;
