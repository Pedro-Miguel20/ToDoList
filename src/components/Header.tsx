import { Route, NavLink } from "react-router-dom";



function Header() {
  return (
    <header className="flex justify-between align-center p-4 bg-blue-700 text-white">
      <NavLink to="/">Home</NavLink>
      <div className="flex gap-4">
        <NavLink to="/todo">Todo</NavLink>
        <NavLink to="/register">Register</NavLink>
      </div>
    </header>
  );
}

export default Header;