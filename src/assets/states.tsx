import { atom } from "recoil";

import { taskInfo } from "../app";
import { groupdata, testdata } from "./testdata";

export const tasksState = atom<taskInfo[]>({
  key: "tasksState",
  default: testdata,
});

export const groupState = atom<string[]>({
  key: "groupState",
  default: groupdata,
});
