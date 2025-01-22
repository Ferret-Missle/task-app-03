import GoogleIcon from "@mui/icons-material/Google";
import Box from "@mui/material/Box";
// import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";

export const ShowAuth = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // //Googleアカウントでのログイン
  // const singInWithGoogle = async () => {};
  // //メールアドレスでのログイン
  // const singInWithEmail = async () => {};

  //画面遷移
  // const navi = useNavigate();
  // const handleClick = (url: string) => navi(url);

  return (
    // <>
    //   <Box sx={{ display: "flex", flexDirection: "column" }}>
    //     <h1>ユーザー登録</h1>
    //     <Button onClick={() => handleClick("/groups")} variant="contained">
    //       ログインボタン（Auth処理は後回し）
    //     </Button>
    //   </Box>
    // </>
    <>
      <CssBaseline />
      <header>
        <Box
          width={"100%"}
          height={"48px"}
          border={"solid 0.5px lightgray"}
          bgcolor={"white"}
        >
          header
        </Box>
      </header>
      <body>
        <Container>
          <Typography
            fontSize={"20px"}
            sx={{ marginTop: "48px", marginBottom: "8px", textAlign: "center" }}
          >
            ログイン
          </Typography>
          <Card
            sx={{
              border: "0.1px solid lightgray",
              maxWidth: "sm",
              marginX: "auto",
            }}
          >
            <CardContent sx={{ marginY: "16px", textAlign: "center" }}>
              <GoogleIcon sx={{ fontSize: "28px" }} />
              <Typography fontSize={"12px"}>Googleでログイン</Typography>
            </CardContent>
            <Divider />
            <CardContent>
              <form>
                <Box marginBottom={"16px"}>
                  <TextField
                    label="メールアドレス"
                    fullWidth
                    sx={{ fontSize: "16px" }}
                  />
                </Box>
                <Box marginBottom={"16px"}>
                  <TextField
                    label="パスワード"
                    fullWidth
                    sx={{ fontSize: "16px" }}
                  />
                </Box>
                <Typography fontSize={"10px"} textAlign={"center"}>
                  パスワードを忘れた場合
                </Typography>
              </form>
            </CardContent>
            <Divider />
            <Typography marginY={"3%"} textAlign={"center"} fontSize={"12px"}>
              新規登録
            </Typography>
          </Card>
        </Container>
      </body>
    </>
  );
};
