import { signOut } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { auth } from "../assets/firebase";
import { theme } from "../components/theme";

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

  //ドロワー管理
  const [open, setOpen] = useState(false);
  const openDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };

  const handleSignOut = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await signOut(auth);
      handleClick("/");
    } catch (error: unknown) {
      alert("ログアウトに失敗しました。\n" + error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed" color="success">
        <Toolbar>
          {/* groupならMenuアイコン、taskならArrowBackを表示 */}
          {isGroupList ? (
            <IconButton
              onClick={openDrawer}
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
        <Drawer
          variant="temporary"
          anchor="left"
          open={open}
          onClose={closeDrawer}
        >
          <List
            sx={{
              width: "300px",
              height: "100%",
              paddingX: "8px",
              paddingY: "0px",
            }}
          >
            <ListItem
              sx={{
                width: "100%",
                marginTop: "16px",
                paddingLeft: "8px",
              }}
            >
              <Typography fontSize={"20px"}>Drawer Header</Typography>
            </ListItem>
            <ListItemButton
              sx={{
                width: "100%",
                marginY: "8px",
                marginLeft: "8px",
              }}
              onClick={handleSignOut}
            >
              <LogoutIcon fontSize={"small"} sx={{ marginRight: "8px" }} />
              <Typography fontSize={"16px"}>サインアウト</Typography>
            </ListItemButton>
          </List>
        </Drawer>
      </AppBar>
      <Toolbar />
    </ThemeProvider>
  );
};
