import { useState } from "react";
import { adicionarUsuario } from "../../api/register";
import { NavLink } from "react-router-dom";
import { IconArrowBarLeft} from "@tabler/icons-react"
import { AnimatePresence, motion } from "framer-motion";



export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await adicionarUsuario(email, password, nome);
  } catch (err: any) {
    console.error('Erro ao cadastrar usuário:', err.message);
  }
};
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        <section>
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <NavLink
                  to="/"
                  className="flex items-center text-lg font-bold text-gray-900 dark:text-white"
                >
                  <IconArrowBarLeft stroke={2} />Home
                </NavLink>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
                </h1>

                <form className="space-y-4 md:space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="nome"
                      className="flex justify-between mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name<InputError message={errors.nome} />
                    </label>
                    <input
                      type="text"
                      name="nome"
                      id="nome"
                      value={form.nome}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-400 mb-1"
                      placeholder="nickname"
                    />
                    
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="flex justify-between mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email <InputError message={errors.email} />
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={form.email}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-400 mb-1"
                      placeholder="name@company.com"
                    />
                  </div>

                  <div className="flex">
                    <div className="w-full">
                    <label
                      htmlFor="password"
                      className="flex justify-between mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password<InputError message={errors.password} />
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      value={form.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-400 mb-1"
                    />
                    </div>
                    <span className="flex justify-around items-center" onClick={handleToggle}>
                      {showPassword ? 
                      (<IconEye className="absolute mr-10 mt-5"
                        size={25}/>
                      ) : (<IconEyeOff
                      className="absolute mr-10 mt-5" size={25}/>)}
                    </span>
                    
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Create an account
                  </button>

                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <NavLink
                      to="/login"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Login here
                    </NavLink>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </AnimatePresence>
  );
}