import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ThemeProvider } from '@emotion/react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { auth } from '../assets/firebase';
import googleIcon from '../assets/googleg.svg';
import { theme } from '../components/theme';

export const ShowAuth = () => {
  //入力欄管理
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  //入力エラー処理
  const [errMessage, setErrMessage] = useState<string>("");
  const [inputEmailErr, setInputEmailErr] = useState<boolean>(false);
  const [inputPasswordErr, setInputPasswordErr] = useState<boolean>(false);
  const [inputConfirmErr, setInputConfirmErr] = useState<boolean>(false);
  const [doEmailEdit, setDoEmailEdit] = useState<boolean>(false);
  const [doPasswordEdit, setDoPasswordEdit] = useState<boolean>(false);
  const [doConfirmEdit, setDoConfirmEdit] = useState<boolean>(false);
  const onEmailClick = () => {
    setDoEmailEdit(true);
  };
  const onPasswordClick = () => {
    setDoPasswordEdit(true);
  };
  const onConfirmClick = () => {
    setDoConfirmEdit(true);
  };
  const onEmailBlur = (value: string) => {
    if (!value && doEmailEdit) setInputEmailErr(true);
  };
  const onPasswordBlur = (value: string) => {
    if (!value && doPasswordEdit) setInputPasswordErr(true);
  };
  const onConfirmBlur = (value: string) => {
    if (!value && doConfirmEdit) setInputConfirmErr(true);
  };

  //ログイン・登録ページ切り替え
  const [switchScreen, setSwitchScreen] = useState<boolean>(true);
  const handlePage = () => {
    setSwitchScreen(!switchScreen);
    setEmail("");
    setPassword("");
    setConfirm("");
    setShowPassword(false);
    setDoEmailEdit(false);
    setDoPasswordEdit(false);
    setDoConfirmEdit(false);
    setInputEmailErr(false);
    setInputPasswordErr(false);
    setInputConfirmErr(false);
    setErrMessage("");
  };

  // //メールアドレスでのログイン
  const signInWithEmail = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      handleClick("/groups");
    } catch (error: unknown) {
      setErrMessage("サインインに失敗しました：\n" + error);
    }
  };
  //ログアウト
  // const handleSignOut = () => {
  //   signOut(auth);
  // };
  //メールアドレスでのユーザ登録
  const signUpWithEmail = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    //入力欄が空欄の時にErr設定
    setInputEmailErr(email ? false : true);
    setInputPasswordErr(password ? false : true);
    setInputConfirmErr(confirm ? false : true);

    //入力内容不一致で終了
    if (!password || !confirm) {
      //未入力でボタンは押せないが念のため
      setErrMessage("全て入力してください");
    } else if (password !== confirm) {
      setErrMessage("入力されたパスワードが一致しません");
      setInputPasswordErr(true);
      setInputConfirmErr(true);
    } else {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        handleClick("/groups");
      } catch (error: unknown) {
        //エラー内容ごとに表示分岐
        // FirebaseError: Firebase: Missing password requirements: [Password must contain at least 8 characters] (auth/password-does-not-meet-requirements).
        setErrMessage("新規登録に失敗しました：\n" + error);
      }
    }
  };
  //パスワード再発行
  const forgetPassword = () => {
    alert("forget Password");
  };
  // //Googleアカウントでのログイン
  // const singInWithGoogle = async () => {
  //   return;
  // };

  //ユーザ情報保存

  // 画面遷移
  const navi = useNavigate();
  const handleClick = (url: string) => navi(url);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <header>
          <Box
            width={"100%"}
            height={"48px"}
            margin={"12px 0px 0px 12px"}
            bgcolor={"white"}
            sx={{ marginBottom: "54px" }}
          >
            <Typography
              fontSize={"28px"}
              sx={{
                textAlign: "left",
              }}
            >
              めもめもくん
            </Typography>
          </Box>
        </header>
        {switchScreen ? (
          <>
            <body>
              <Container>
                <Typography
                  fontSize={"20px"}
                  sx={{
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
                    [theme.breakpoints.up("md")]: { width: "40%" },
                    marginX: "auto",
                    marginTop: "12px",
                    marginBottom: "24px",
                  }}
                >
                  <CardContent sx={{ marginY: 1, textAlign: "center" }}>
                    <IconButton
                      sx={{ border: "0.5px solid", marginBottom: "8px" }}
                      // onClick={singInWithGoogle}
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
                      <Box marginBottom={"20px"}>
                        <Typography
                          fontSize={"16px"}
                          textAlign={"left"}
                          sx={{ marginBottom: "24px" }}
                        >
                          メールアドレス/パスワードでログイン
                        </Typography>
                        <TextField
                          value={email}
                          label="メールアドレス"
                          placeholder="mail@example.com"
                          type="email"
                          required
                          onClick={() => onEmailClick()}
                          onChange={(e) => setEmail(e.target.value)}
                          fullWidth
                          onBlur={(e) => onEmailBlur(e.target.value)}
                          error={inputEmailErr && !email}
                          sx={{ fontSize: "16px" }}
                        />
                      </Box>
                      <Box>
                        <TextField
                          value={password}
                          label="パスワード"
                          type={showPassword ? "text" : "password"}
                          required
                          onClick={() => onPasswordClick()}
                          onChange={(e) => setPassword(e.target.value)}
                          fullWidth
                          onBlur={(e) => onPasswordBlur(e.target.value)}
                          error={inputPasswordErr && !password}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? (
                                    <VisibilityOffIcon />
                                  ) : (
                                    <VisibilityIcon />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
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
                        onClick={forgetPassword}
                      >
                        <Typography
                          fontSize={"12px"}
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
                        onClick={signInWithEmail}
                        disabled={email && password ? false : true}
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
                    onClick={handlePage}
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
          </>
        ) : (
          <>
            <body>
              <Container>
                <Typography
                  fontSize={"20px"}
                  sx={{
                    textAlign: "center",
                  }}
                >
                  新規登録
                </Typography>
                <Card
                  sx={{
                    border: "0.1px solid lightgray",
                    [theme.breakpoints.up("xs")]: { width: "100%" },
                    [theme.breakpoints.up("sm")]: { width: "60%" },
                    [theme.breakpoints.up("md")]: { width: "40%" },
                    marginX: "auto",
                    marginTop: "12px",
                    marginBottom: "24px",
                  }}
                >
                  <CardContent sx={{ marginY: "8px", textAlign: "center" }}>
                    <form>
                      <Box marginBottom={"20px"}>
                        <TextField
                          value={email}
                          label="メールアドレス"
                          placeholder="mail@example.com"
                          type="email"
                          required
                          onClick={() => onEmailClick()}
                          onChange={(e) => setEmail(e.target.value)}
                          fullWidth
                          onBlur={(e) => onEmailBlur(e.target.value)}
                          error={inputEmailErr && !email}
                          sx={{
                            fontSize: "16px",
                            padding: "0px",
                          }}
                        />
                      </Box>
                      <Box marginBottom={"20px"}>
                        <TextField
                          value={password}
                          label="パスワード"
                          type={showPassword ? "text" : "password"}
                          required
                          onClick={() => onPasswordClick()}
                          onChange={(e) => setPassword(e.target.value)}
                          fullWidth
                          onBlur={(e) => onPasswordBlur(e.target.value)}
                          error={
                            doPasswordEdit &&
                            (inputPasswordErr || password === "")
                          }
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? (
                                    <VisibilityOffIcon />
                                  ) : (
                                    <VisibilityIcon />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          sx={{ fontSize: "16px" }}
                        />
                      </Box>
                      <Box marginBottom={"20px"}>
                        <TextField
                          value={confirm}
                          label="パスワード確認"
                          type={showPassword ? "text" : "password"}
                          required
                          onClick={() => onConfirmClick()}
                          onChange={(e) => setConfirm(e.target.value)}
                          fullWidth
                          onBlur={(e) => onConfirmBlur(e.target.value)}
                          error={
                            doConfirmEdit && (inputConfirmErr || confirm === "")
                          }
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? (
                                    <VisibilityOffIcon />
                                  ) : (
                                    <VisibilityIcon />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          sx={{ fontSize: "16px", marginBottom: "20px" }}
                        />
                        {errMessage ? (
                          <Typography
                            color={"red"}
                            fontSize={"12px"}
                            textAlign={"left"}
                          >
                            {errMessage}
                          </Typography>
                        ) : (
                          ""
                        )}
                      </Box>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{ height: "48px" }}
                        onClick={signUpWithEmail}
                        disabled={email && password && confirm ? false : true}
                      >
                        <Typography color={theme.palette.success.contrastText}>
                          新規登録
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
                    onClick={handlePage}
                  >
                    <Typography
                      marginY={2}
                      paddingY={1}
                      paddingX={4}
                      textAlign={"center"}
                      fontSize={"12px"}
                      sx={{ textDecoration: "underline" }}
                    >
                      ログインはこちら
                    </Typography>
                  </Button>
                </Card>
              </Container>
            </body>
          </>
        )}
      </ThemeProvider>
    </>
  );
};
