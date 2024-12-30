import { useNavigate } from "react-router-dom";

export const ShowAuth = () => {
  //画面遷移
  const navi=useNavigate();
  const handleClick = (url: string) => navi(url);

  return (
    <>
      <h1>ユーザー登録</h1>
      <button onClick={()=>handleClick("/groups")}>ログインボタン</button>
    </>
      );
}