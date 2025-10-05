import App from "../App.tsx";
import { createBrowserRouter } from "react-router";
import CardDetail from "../components/carddetail.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "/movie/:id", element: <CardDetail /> },
]);
