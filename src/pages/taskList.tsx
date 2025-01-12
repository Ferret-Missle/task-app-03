import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ThemeProvider } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import { theme } from "../components/theme";
import { ShowAppBar } from "../components/appBar";
import { testdata } from "../assets/testdata";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ShowFAB } from "../components/fab";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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
  const ShowMenu = (id: string) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const clickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      console.log("menu id is " + id);
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
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Edit</MenuItem>
          <MenuItem onClick={() => deleteTask(id)}>Delete</MenuItem>
        </Menu>
      </div>
    );
  };

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
        <ShowFAB />
      </footer>
    </ThemeProvider>
  );
};
