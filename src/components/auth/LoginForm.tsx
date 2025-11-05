import { NavLink, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/login";
import { useState } from "react";
import { IconArrowBarLeft} from "@tabler/icons-react"
import { AnimatePresence, motion } from "framer-motion";
import inputAuthValidation from "../../services/InputAuthValidation";
import InputError from "../error/inputError";


function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    message: "",
  });

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    // limpa o erro do campo quando o usuário começa a digitar
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
      const validation = inputAuthValidation(form, "login");
    
      if (!validation.isValid) {
        setErrors(validation.errors);
        console.log(validation.errors) // exibe erros específicos
        return;
      }

    try {
      await loginUser(form.email, form.password);
      navigate("/todo"); // redireciona para sua página de tarefas
    } catch (error: any) {
      console.error(error);

      setErrors((prev) => ({
        ...prev,
        email: error?.message || "Erro ao fazer login",
      }));
    }
  };

  return (
    <>
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <NavLink to="/" className="flex items-center text-lg font-bold text-gray-900 dark:text-white">
              <IconArrowBarLeft stroke={2} /> Home
            </NavLink>

            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="email" className="flex justify-between mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email<InputError message={errors.email}/>
                </label>
                <input
                  name="email"
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="name@company.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="flex justify-between mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password<InputError message={errors.password}/>
                </label>
                <input
                  name="password"
                  type="password"
                  id="password"
                  value={form.password}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <NavLink to="/register" className="font-medium text-blue-600 hover:underline">
                  Sign up
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
      </motion.div>
    </AnimatePresence>
    </>
  );
}

export default Login;