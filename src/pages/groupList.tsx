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
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DeleteIcon from '@mui/icons-material/Delete';

export const ShowGroupList = () => {
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
      <List sx={{bgcolor:theme.palette.primary.dark}}>
        {groups.sort().map((group) =>
          <ListItem sx={{
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
            <IconButton
              onClick={()=>deleteGroup(group)}
            >
              <DeleteIcon/>
            </IconButton>
            <IconButton
              onClick={() => handleClick("/" + group)}
              sx={{ marginLeft: "0px", marginRight: "8px" }}
            >
              <ArrowForwardIosIcon sx={{color:"darkgreen"}} />
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