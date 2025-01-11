import { theme } from "../components/theme";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

export const ShowAppBar = ({
  title = "(no data)",
  isGroupList,
}: {
  title: string | undefined;
  isGroupList: boolean;
}) => {
  //画面遷移管理
  const navi = useNavigate();
  const handleClick = (url: string) => navi(url);

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed" color="success">
        <Toolbar>
          {/* groupならMenuアイコン、taskならArrowBackを表示 */}
          {isGroupList ? (
            <IconButton
              sx={{
                color: "white",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                marginRight: 3,
              }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => handleClick("/groups")}
              sx={{
                color: "white",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                marginRight: 3,
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography variant="h6" textAlign={"center"}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </ThemeProvider>
  );
};
