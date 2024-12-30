import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ShowGroupList } from "./pages/groupList";
import { ShowTaskList } from "./pages/taskList";
import { ShowAuth } from "./pages/login";

//タスクオブジェクト定義
export type taskInfo = {
  id: string;
  groupName:string;
  taskName: string;
  period: string;
  checked: boolean;
};

//アプリケーション起動
export function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShowAuth/>}/>
          <Route path="/groups/" element={<ShowGroupList />} />
          <Route path="/:groupName" element={<ShowTaskList />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}