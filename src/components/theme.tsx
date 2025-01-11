import { createTheme } from "@mui/material";

//アプリテーマ
export const theme = createTheme({
  typography: {
    fontFamily: "Roboto",
    fontSize: 16,
    button: { textTransform: "none" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "darkgreen",
          textAlign: "left",
          width: "100%",
          paddingLeft: "36px",
        },
      },
    },
  },
  palette: {
    primary: {
      //main色
      main: "#1A5319",
      //背景色
      dark: "#EEEDEB",
      //
      light: "#c7e4c4",
      contrastText: "#fff",
    },
  },
});

export const darkTheme = createTheme({
  typography: {
    fontFamily: "Roboto",
    fontSize: 16,
  },
  palette: {
    primary: {
      main: "#4aa83f",
      dark: "#2a7722",
      light: "#c7e4c4",
      contrastText: "#fff",
    },
  },
});
