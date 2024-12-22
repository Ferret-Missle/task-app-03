
import { createTheme } from "@mui/material";

//アプリテーマ
export const theme = createTheme({
  typography: {
    fontFamily: "Roboto",
    fontSize: 16,
    button: { textTransform: "none" },
  },
  palette: {
    primary: {
      main: "#4aa83f",
      dark: "#2a7722",
      light: "#c7e4c4",
      contrastText: "#fff",
    },
    secondary: {
      main: "#c2c2c2",
      dark: "#606060",
      light: "#f5f5f5",
    },
  },
});
export const darkTheme = createTheme({
  typography: {
    fontFamily: "Roboto",
    fontSize: 14,
  },
  palette: {},
});
