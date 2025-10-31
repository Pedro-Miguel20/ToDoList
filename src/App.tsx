import {
  createBrowserRouter,
  RouterProvider, redirect
} from "react-router-dom";
import Home from "./pages/Home";
import Todo from "./pages/TodoCalendar";
import Landing from "./pages/Landing";
import './App.css';
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import LandingLayout from "./layouts/LandingLayout";
import TodoCalendar from "./components/TodoList";

function checkAuth() {
  const user = localStorage.getItem("usuario");
  if (!user) {
    throw redirect("/login");
  }
  return user
}

const router = createBrowserRouter([
  {
    element: <MainLayout/>,
    children: [
      {path: "/home", element: <Home/>},
      {path: "/todo", element: <TodoCalendar/>}
    ],
    loader: checkAuth
  },
  {
    element: <AuthLayout/>,
    children: [
      {path: "/register", element: <RegisterForm/>},
      {path: "/login", element: <LoginForm/>}
    ]
  },
  {
    element: <LandingLayout/>,
    children: [
      {path: "/", element: <Landing/>},
    ],
    loader: checkAuth
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
