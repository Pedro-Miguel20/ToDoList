import { Route, NavLink } from "react-router-dom";
import {Logout} from "../services/logout";


function Header() {
  return (
    <header className="flex justify-between align-center p-4 bg-blue-700 text-white">
      <NavLink to="/">Home</NavLink>
      <div className="flex gap-4">
        <NavLink to="/todo">Todo</NavLink>
        <NavLink to="/register">Register</NavLink>
        <button onClick={Logout} className="px-4 py-2 bg-white text-blue-700 rounded">
      Logout
    </button>
      </div>
    </header>
  );
}

export default Header;