import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";

import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ThemeProvider } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { taskInfo } from "../app";
import { groupState, tasksState, userState } from "../assets/states";
import { ShowAppBar } from "../components/appBar";
import { theme } from "../components/theme";

export const ShowGroupList = () => {
  const user = useRecoilValue(userState);

  //画面遷移
  const navi = useNavigate();
  const handleClick = (url: string) => navi(url);

  //ダイアログ管理
  const [open, setOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<string>("");
  const openDialog = (defName: string) => {
    setIsEdit(defName);
    setGroupname(defName);
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
  };

  //入力欄管理
  const [groupname, setGroupname] = useState<string>("");

  //データ管理
  const [tasks, setTasks] = useRecoilState<taskInfo[]>(tasksState);
  const [groups, setGroups] = useRecoilState<string[]>(groupState);
  const addGroup = (target: string) => {
    setGroups([target, ...groups]);
    closeDialog();
  };
  const editGroup = (oldGroup: string, newGroup: string) => {
    setGroups(
      groups.map((group) => {
        return group !== oldGroup ? group : newGroup;
      })
    );
    const newTasks = tasks.map((task) => {
      if (task.groupName === oldGroup) {
        console.log("groupName:" + oldGroup + "->" + newGroup);
        return { ...task, groupName: newGroup };
      }
      return task;
    });
    setTasks(newTasks);
    closeDialog();
  };
  const deleteGroup = (target: string) => {
    const newGroups = groups.filter((group) => {
      return group !== target;
    });
    setGroups(newGroups);
    const newTasks = tasks.filter((task) => {
      return task.groupName !== target;
    });
    setTasks(newTasks);
  };

  //Menuボタン押下時
  const ShowMenu = ({ groupname }: { groupname: string }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const clickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <IconButton
          aria-controls={"menu-" + groupname}
          aria-haspopup="true"
          onClick={clickMenu}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id={"menu-" + groupname}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => openDialog(groupname)}>Edit</MenuItem>
          <MenuItem onClick={() => deleteGroup(groupname)}>Delete</MenuItem>
        </Menu>
      </div>
    );
  };

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <header>
          <ShowAppBar
            title={"フォルダ一覧 [" + user?.email + "]"}
            isGroupList={true}
          />
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
                <ShowMenu groupname={group} />
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
              <TextField
                label="グループ名"
                required
                autoFocus={true}
                value={groupname}
                type="text"
                variant="outlined"
                sx={{ marginY: "16px", width: "100%", fontSize: "16px" }}
                onChange={(e) => setGroupname(e.target.value)}
              />
            </DialogContent>
            <Typography></Typography>
            <DialogActions sx={{ paddingTop: "16px" }}>
              <Button
                onClick={() =>
                  isEdit === ""
                    ? addGroup(groupname)
                    : editGroup(isEdit, groupname)
                }
                sx={{ paddingLeft: "8px", alignItems: "right" }}
                disabled={groupname ? false : true}
              >
                {isEdit === "" ? "追加" : "編集"}
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
