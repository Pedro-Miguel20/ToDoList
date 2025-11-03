import { Route, NavLink } from "react-router-dom";
import Options from "./Options";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";



function Header() {
  
  function Clock(){

  const [today, setToday] = useState(dayjs().format("DD/MM/YYYY HH:mm:ss"));
  useEffect(() =>{
    const Interval = setInterval(()=>{
      setToday(dayjs().format("DD/MM/YYYY HH:mm:ss"));     
    }, 1000);

    return () => {clearInterval};
  });

  return <p className="text-sm opacity-50 hover:opacity-100 select-none cursor-pointer">{today}</p>
  }


  const loginUser = localStorage.getItem("usuario");

  return (
    <>
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <header className="flex justify-between items-center align-center p-4 bg-blue-700 text-white">
      {loginUser && (<NavLink to="/home">ToDo</NavLink>)}
      
      {!loginUser && (<NavLink to="/">ToDoList</NavLink>)}
      <nav>

      </nav>
      <div className="flex items-center gap-5 sm:gap-10">
        {loginUser && (<Clock/>)}
        {loginUser && (<NavLink to="/todo" className="opacity-80 hover:opacity-100">Calendar</NavLink>)}
        {!loginUser && (<NavLink to="/register" >Register</NavLink>)}
        {!loginUser && (<NavLink to="/login" >Login</NavLink>)}
        {loginUser && (<Options/>)}
      </div>
    </header>
      </motion.div>
    </AnimatePresence>
    </>
  );
}

export default Header;