import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function Hero(){
    return(
        <>
        
            <motion.div className="flex grow-1 flex-col items-center justify-center p-4 gap-8"
      initial={{ opacity: 0, y: 50 }} // Starting state
      animate={{ opacity: 1, y: 0 }}   // Ending state
      transition={{ duration: 0.5 }}   // Animation duration
    >
                <div className="">
                    <h1 className="font-extrabold text-6xl text-center">Organize your life with <br></br><span className="text-blue-700">ToDoList</span></h1>
                </div>
                <div className="text-center">
                    <p className="text-lg text-gray-500">The simplest and most efficient way to manage your daily tasks. <br></br>Increase your productivity and never forget what's important again.</p>
                </div>
                <div className="w-full flex gap-5 justify-center">
                    <NavLink className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center" to="/register">
                        Get started!
                    </NavLink>
                    <NavLink className="text-md font-bold border bg-gray-100 border-gray-300 rounded-md px-5 py-2.5 hover:bg-blue-500 hover:text-white" to="/sobre">
                        More About
                    </NavLink>
                </div>
                <div className="">

                </div>
            </motion.div>     
        </>
    )
}