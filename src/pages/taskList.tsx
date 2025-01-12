import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ThemeProvider } from "@mui/material";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import Fab from "@mui/material/Fab";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import { theme } from "../components/theme";
import { ShowAppBar } from "../components/appBar";
import { testdata } from "../assets/testdata";
import { useState } from "react";
import { useParams } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";

export const ShowTaskList = () => {
  const param = useParams();
  const name = param.groupName;

  //データ管理
  const [tasks, setTasks] = useState(testdata);
  const deleteTask = (target: string) => {
    const newTasks = tasks.filter((task) => {
      return task.id !== target;
    });
    setTasks(newTasks);
    console.log("delete id is " + target);
  };

  //チェックボタン押下時
  const clickCheck = (id: string) => {
    const checkChange = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, checked: !task.checked };
      }
      return task;
    });
    setTasks(checkChange);
    console.log("delete id is " + id);
  };

  //Menuボタン押下時
  const ShowMenu = ({ id }: { id: string }) => {
    // console.log("[menu id is " + id + "]");
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
          aria-controls={"menu-" + id}
          aria-haspopup="true"
          onClick={clickMenu}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id={"menu-" + id}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => handleClose}
        >
          <MenuItem onClick={() => handleClose}>Edit</MenuItem>
          <MenuItem onClick={() => deleteTask(id)}>Delete</MenuItem>
        </Menu>
      </div>
    );
  };

  //ダイアログ管理
  const [open, setOpen] = useState<boolean>(false);
  const openDialog = () => {
    setOpen(true);
  };
  const closeDialog = () => {
    setTaskname("");
    setTaskdate("");
    setOpen(false);
  };

  //入力欄管理
  const [taskname, setTaskname] = useState<string>("");
  const [taskdate, setTaskdate] = useState<string>("");

  return (
    <ThemeProvider theme={theme}>
      <header>
        <ShowAppBar title={name} isGroupList={false} />
      </header>
      <body>
        <List>
          {tasks.map((task) => (
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
              <Checkbox
                sx={{ color: "darkgreen", marginRight: "16px" }}
                checked={task.checked}
                onChange={() => clickCheck(task.id)}
              />
              <ListItemText
                sx={{ color: "darkgreen" }}
                primary={task.taskName}
                secondary={"create:" + task.period}
              />
              <ShowMenu id={task.id} />
            </ListItem>
          ))}
          <ListItem sx={{ height: "60px" }} />
        </List>
      </body>
      <footer>
        <Fab
          onClick={() => openDialog()}
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
          <DialogTitle>タスクを追加する</DialogTitle>
          <DialogContent sx={{ padding: "8px 24px" }}>
            <DialogContentText sx={{ fontSize: "16px" }}>
              タスク名
            </DialogContentText>
            <TextField
              autoFocus={true}
              value={taskname}
              type="text"
              variant="outlined"
              sx={{ width: "100%", fontSize: "16px" }}
              onChange={(e) => setTaskname(e.target.value)}
            />
          </DialogContent>
          <DialogContent sx={{ padding: "8px 24px" }}>
            <DialogContentText sx={{ fontSize: "16px" }}>
              期限日
            </DialogContentText>
            <TextField
              value={taskdate}
              onChange={(e) => setTaskdate(e.target.value)}
              type="date"
              variant="outlined"
              sx={{ width: "100%", fontSize: "16px" }}
            />
          </DialogContent>
          <DialogActions sx={{ paddingTop: "16px" }}>
            <Button
              onClick={closeDialog}
              sx={{ paddingLeft: "8px", alignItems: "right" }}
              disabled={taskname && taskdate ? false : true}
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
  );
};
