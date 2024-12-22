import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useNavigate } from 'react-router-dom';
import { ShowAppBar } from '../components/appBar';
import { useState } from 'react';
import { groupdata } from '../assets/testdata';
import { ThemeProvider } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { theme } from '../components/theme';
import { ShowFAB } from '../components/fab';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const ShowGroupList=()=>{
  //画面遷移
  const navi=useNavigate();
  const handleClick=(url:string)=>navi(url);
  //データ管理
  const [groups, setGroups] = useState(groupdata);
  const deleteGroup = (target: string) => {
    const newGroups = groups.filter(group => { return (group !== target) });
    setGroups(newGroups);
   };

  return(
    <ThemeProvider theme={theme}>
      <header>
        <ShowAppBar title='フォルダ一覧' isGroupList={true}/>
      </header>
      <body>
      <List sx={{marginTop:'8px'}}>
        {groups.sort().map((group) =>
          <ListItem sx={{
            border: "2px solid",
            borderRadius: "8px",
            borderColor: theme.palette.primary.main,
            bgcolor: theme.palette.primary.light,
            color:theme.palette.primary.dark,
            width: {
              xs: "90%",
              sm: "90%",
              md: "90%",
              lg: "40%",
              xl: "40%",
            },
            marginX: "auto",
            marginBottom: "4px",
            paddingLeft: "8px",
            paddingRight:"0px"
          }}
          >
            <Button sx={{
                  color: "darkgreen",
                  textAlign: "left",
                  width: "100%",
                  display: "block",
                }}
                onClick={() => handleClick("/" + group)}>
              <ListItemText>{group}</ListItemText>
            </Button>
            <IconButton sx={{ marginX: "0px" }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => deleteGroup(group)}
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