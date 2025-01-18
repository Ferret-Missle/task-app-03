import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecoilRoot, useRecoilState } from "recoil";

import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ThemeProvider } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";

import { groupState } from "../assets/states";
import { ShowAppBar } from "../components/appBar";
import { theme } from "../components/theme";

export const ShowGroupList = () => {
  //画面遷移
  const navi = useNavigate();
  const handleClick = (url: string) => navi(url);
  //データ管理
  const [groups, setGroups] = useRecoilState<string[]>(groupState);
  const deleteGroup = (target: string) => {
    const newGroups = groups.filter((group) => {
      return group !== target;
    });
    setGroups(newGroups);
  };

  //ダイアログ管理
  const [open, setOpen] = useState<boolean>(false);
  const [inputName, setInputName] = useState<string>("");
  const openDialog = (defName: string) => {
    setInputName(defName);
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <header>
          <ShowAppBar title="フォルダ一覧" isGroupList={true} />
        </header>
        <body>
          <List>
            {groups.map((group) => (
              <ListItem
                sx={{
                  borderColor: theme.palette.primary.main,
                  bgcolor: "white",
                  color: "darkgreen",
                  width: {
                    xs: "100%",
                    sm: "100%",
                    md: "100%",
                    lg: "60%",
                    xl: "60%",
                  },
                }}
              >
                <Button onClick={() => handleClick("/" + group)}>
                  <ListItemText>{group}</ListItemText>
                </Button>
                <IconButton onClick={() => deleteGroup(group)}>
                  <MoreVertIcon />
                </IconButton>
              </ListItem>
            ))}
            <ListItem sx={{ height: "48px" }} />
          </List>
        </body>
        <footer>
          <Fab
            onClick={() => openDialog("")}
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
          <Dialog open={open} onClose={closeDialog}>
            <DialogTitle>{"グループ追加"}</DialogTitle>
            <DialogContent sx={{ padding: "8px 24px" }}>
              <DialogContentText sx={{ fontSize: "16px" }}>
                グループ名
              </DialogContentText>
              <TextField
                autoFocus={true}
                value={inputName}
                type="text"
                variant="outlined"
                sx={{ width: "100%", fontSize: "16px" }}
                onChange={(e) => setInputName(e.target.value)}
              />
            </DialogContent>
            <DialogActions sx={{ paddingTop: "16px" }}>
              <Button
                // onClick={() =>
                //   isEdit === ""
                //     ? addTask(taskname, taskdate)
                //     : editTask(isEdit, taskname, taskdate)
                // }
                sx={{ paddingLeft: "8px", alignItems: "right" }}
                disabled={inputName ? false : true}
              >
                追加
              </Button>
              <Button
                onClick={closeDialog}
                sx={{ paddingLeft: "8px", alignItems: "right" }}
              >
                キャンセル
              </Button>
            </DialogActions>
          </Dialog>
        </footer>
      </ThemeProvider>
    </RecoilRoot>
  );
};
