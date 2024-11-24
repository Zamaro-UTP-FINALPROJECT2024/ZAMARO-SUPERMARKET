import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2B6CB0", // Azul oscuro
    },
    secondary: {
      main: "#2C5282", // Azul más oscuro
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

export default theme;
