import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ThemeProvider } from "@emotion/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import googleIcon from "../assets/googleg.svg";
import { theme } from "../components/theme";

export const ShowAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // //Googleアカウントでのログイン
  // const singInWithGoogle = async () => {};
  // //メールアドレスでのログイン
  // const singInWithEmail = async () => {};

  // 画面遷移
  const navi = useNavigate();
  const handleClick = (url: string) => navi(url);

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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <header>
          <Box
            width={"100%"}
            height={"48px"}
            margin={"12px 0px 0px 12px"}
            // border={"solid 0.5px lightgray"}
            bgcolor={"white"}
          >
            <Typography
              fontSize={"28px"}
              sx={{
                textAlign: "left",
              }}
            >
              header
            </Typography>
          </Box>
        </header>
        <body>
          <Container>
            <Typography
              fontSize={"20px"}
              sx={{
                marginTop: "24px",
                textAlign: "center",
              }}
            >
              ログイン
            </Typography>
            <Card
              sx={{
                border: "0.1px solid lightgray",
                [theme.breakpoints.up("xs")]: { width: "100%" },
                [theme.breakpoints.up("sm")]: { width: "60%" },
                [theme.breakpoints.up("md")]: { width: "30%" },
                marginX: "auto",
                marginTop: "12px",
                marginBottom: "24px",
              }}
            >
              <CardContent sx={{ marginY: 1, textAlign: "center" }}>
                <IconButton
                  sx={{ border: "0.5px solid", marginBottom: "8px" }}
                  onClick={() => alert("Button Clicked")}
                >
                  <img src={googleIcon} width={"40px"} />
                </IconButton>
                <Typography fontSize={"12px"}>Googleでログイン</Typography>
              </CardContent>
              <CardContent sx={{ padding: "0", textAlign: "center" }}>
                <Typography fontSize={"12px"}>or</Typography>
              </CardContent>
              <Divider />
              <CardContent sx={{ marginY: "8px", textAlign: "center" }}>
                <form>
                  <Box marginBottom={"18px"}>
                    <Typography
                      fontSize={"16px"}
                      textAlign={"left"}
                      sx={{ marginBottom: "4px" }}
                    >
                      メールアドレス
                    </Typography>
                    <TextField
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      fullWidth
                      sx={{
                        fontSize: "16px",
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      fontSize={"16px"}
                      textAlign={"left"}
                      sx={{ marginBottom: "4px" }}
                    >
                      パスワード
                    </Typography>
                    <TextField
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      fullWidth
                      sx={{ fontSize: "16px", padding: "0" }}
                    />
                  </Box>
                  <Button
                    sx={{
                      width: 150,
                      marginTop: 1,
                      marginBottom: 3,
                      padding: 0,
                    }}
                    onClick={() => alert("Button Clicked")}
                  >
                    <Typography
                      fontSize={"10px"}
                      textAlign={"center"}
                      sx={{ textDecoration: "underline" }}
                    >
                      パスワードを忘れた場合
                    </Typography>
                  </Button>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ height: "48px" }}
                    onClick={() => handleClick("/groups")}
                  >
                    <Typography color={theme.palette.success.contrastText}>
                      ログイン
                    </Typography>
                  </Button>
                </form>
              </CardContent>
              <Divider />
              <Button
                fullWidth
                sx={{
                  padding: 0,
                }}
                onClick={() => alert("Button Clicked")}
              >
                <Typography
                  marginY={2}
                  paddingY={1}
                  paddingX={4}
                  textAlign={"center"}
                  fontSize={"12px"}
                  sx={{ textDecoration: "underline" }}
                >
                  新規登録はこちら
                </Typography>
              </Button>
            </Card>
          </Container>
        </body>
      </ThemeProvider>
    </>
  );
};
