import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Todo from "./pages/Todo";
import './App.css';
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";


const router = createBrowserRouter([
  {
    element: <MainLayout/>,
    children: [
      {path: "/", element: <Home/>},
      {path: "/todo", element: <Todo/>}
    ]
  },
  {
    element: <AuthLayout/>,
    children: [
      {path: "/register", element: <RegisterForm/>},
      {path: "/login", element: <LoginForm/>}
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
