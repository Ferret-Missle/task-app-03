import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export const ShowAuth = () => {
  //画面遷移
  const navi = useNavigate();
  const handleClick = (url: string) => navi(url);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <h1>ユーザー登録</h1>
        <Button onClick={() => handleClick("/groups")} variant="contained">
          ログインボタン（Auth処理は後回し）
        </Button>
      </Box>
    </>
  );
};
