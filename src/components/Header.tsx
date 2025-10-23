import { Route, NavLink } from "react-router-dom";


function Header() {
  return (
    <header className="flex justify-between align-center p-4 bg-blue-500 text-white">
      <h1>ToDo List</h1>
      <div className="flex gap-4">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/todo">Todo</NavLink>
      </div>
    </header>
  );
}

export default Header;