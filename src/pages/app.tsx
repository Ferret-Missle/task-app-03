import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ShowGroupList } from "./groupList";
import { ShowTaskList } from './taskList';

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
          <Route path="/" element={<ShowGroupList />} />
          <Route path="/:groupName" element={<ShowTaskList />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}