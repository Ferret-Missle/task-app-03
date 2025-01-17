import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useNavigate } from "react-router-dom";
import { ShowAppBar } from "../components/appBar";
import { ThemeProvider } from "@mui/material";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import { theme } from "../components/theme";
import { ShowFAB } from "../components/fab";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { RecoilRoot, useRecoilState } from "recoil";
import { groupState } from "../assets/states";

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
          <ShowFAB />
        </footer>
      </ThemeProvider>
    </RecoilRoot>
  );
};
