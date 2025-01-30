import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import GlobalStyles from "@mui/material/GlobalStyles";

import { App } from "./app";

createRoot(document.getElementById("root")! as Element).render(
  <StrictMode>
    {/* ブラウザ初期設定のCSSを初期化 */}
    <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
    <App />
  </StrictMode>
);
