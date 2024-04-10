import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import QueryProvider from "./react-query/Provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryProvider>
    <App />
  </QueryProvider>
);
