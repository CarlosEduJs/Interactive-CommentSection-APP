import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CommentProvider } from "./context/CommentsContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CommentProvider>
      <App />
    </CommentProvider>
  </StrictMode>
);
