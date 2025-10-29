import { Route, NavLink } from "react-router-dom";
import {Logout} from "../services/logout";

function Header() {

  const loginUser = localStorage.getItem("usuario");

  return (
    <header className="flex justify-between items-center align-center p-4 bg-blue-700 text-white">
      <NavLink to="/">Home</NavLink>
      <div className="flex items-center gap-4">
        {loginUser && (<NavLink to="/todo">Todo</NavLink>)}
        {!loginUser && (<NavLink to="/register" >Register</NavLink>)}
        {loginUser && (<button onClick={Logout} className="px-4 py-2 bg-white text-blue-700 rounded">
      Logout
    </button>)}
      </div>
    </header>
  );
}

export default Header;