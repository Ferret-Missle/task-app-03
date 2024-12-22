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
  const name:string|undefined = !param.groupName ? param.groupName : "(no data)";

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
      <List sx={{marginTop:'8px'}}>
        {tasks.map((task) =>
          <ListItem sx={{
            border: "2px solid",
            borderRadius: "8px",
            borderColor: theme.palette.primary.main,
            bgcolor: theme.palette.primary.light,
            width: {
              xs: "90%",
              sm: "90%",
              md: "90%",
              lg: "40%",
              xl: "40%",
            },
            marginX: "auto",
            marginBottom: "4px",
            padding:"0px"
          }}
          >
            <Checkbox sx={{ marginRight:"8px"}} />
            <ListItemText
              sx={{
                color: theme.palette.primary.dark
              }}
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