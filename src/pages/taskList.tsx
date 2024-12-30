import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ThemeProvider } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import { theme } from '../components/theme';
import { ShowAppBar } from '../components/appBar';
import { testdata } from '../assets/testdata';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';
import { ShowFAB } from '../components/fab';

export const ShowTaskList = () => {
  const param = useParams();
  const name= param.groupName;

  //データ管理
  const [tasks, setTasks] = useState(testdata);
  const deleteTask = (target: string) => {
    const newTasks=tasks.filter(task => { return (task.id !== target) });
    setTasks(newTasks);
  };

  return(
    <ThemeProvider theme={theme}>
      <header>
        <ShowAppBar title={name} isGroupList={false}/>
      </header>
      <body>
      <List sx={{bgcolor:theme.palette.primary.dark}}>
        {tasks.map((task) =>
          <ListItem sx={{
            // border: "1px solid",
            borderRadius: "8px",
            borderColor: theme.palette.primary.main,
            bgcolor: "white",
            color: "darkgreen",
            width: {
              xs: "90%",
              sm: "90%",
              md: "60%",
              lg: "60%",
              xl: "60%",
            },
            marginX: "auto",
            marginBottom: "4px",
            padding:"0px"
          }}
          >
            <Checkbox sx={{ color: "darkgreen",marginRight:"8px"}} />
            <ListItemText
              sx={{color: "darkgreen"}}
              primary={task.taskName}
              secondary={task.period}
            />
            <IconButton
              sx={{ marginX: "0px" }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => deleteTask(task.id)}
              sx={{ marginLeft: "0px", marginRight: "8px" }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        )}
        </List>
      </body>
      <footer>
        <ShowFAB/>
      </footer>
    </ThemeProvider>
  );
}