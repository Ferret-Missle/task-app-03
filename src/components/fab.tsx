import { theme } from "./theme";
import Fab from "@mui/material/Fab";
import AddIcon from '@mui/icons-material/Add';
import { ThemeProvider } from '@mui/material';
//FAB表示
export function ShowFAB() {
  return (
    <ThemeProvider theme={theme}>
      <Fab
        // onClick={""}
        size="large"
        style={{ position: "fixed", bottom: 16, right: 16 }}
        sx={{
          color: theme.palette.success.contrastText,
          bgcolor: theme.palette.success.main,
          ":hover": {
            bgcolor: theme.palette.success.light,
          },
        }}
      >
        <AddIcon sx={{ fontSize: "32px" }} />
      </Fab>
    </ThemeProvider>
  );
}