import { Route, NavLink } from "react-router-dom";
import {Logout} from "../services/logout";
import { IconLogout2 } from '@tabler/icons-react';



function Header() {

  const loginUser = localStorage.getItem("usuario");

  return (
    <header className="flex justify-between items-center align-center p-4 bg-blue-700 text-white">
      <NavLink to="/">Home</NavLink>
      <div className="flex items-center gap-4">
        {loginUser && (<NavLink to="/todo">Todo</NavLink>)}
        {!loginUser && (<NavLink to="/register" >Register</NavLink>)}
        {loginUser && (<button onClick={Logout} className="flex px-3 py-2 bg-white text-blue-700 rounded gap-2"><IconLogout2/><p>Logout</p></button>)}
      </div>
    </header>
  );
}

export default Header;