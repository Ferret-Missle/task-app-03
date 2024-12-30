import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import GlobalStyles from "@mui/material/GlobalStyles";
// import { initializeApp } from "firebase/app";

//  const firebaseConfig = {
//    apiKey: import.meta.env.VITE_API_KEY,
//    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//    projectId: import.meta.env.VITE_PROJECT_ID,
//    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
//    appId: import.meta.env.VITE_APP_ID,
//  };
//  const app = initializeApp(firebaseConfig);

createRoot(document.getElementById("root")! as Element).render(
  <StrictMode>
    {/* ブラウザ初期設定のCSSを初期化 */}
    <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
    <App />
  </StrictMode>
);