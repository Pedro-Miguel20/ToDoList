import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { adicionarUsuario } from "../../api/register";
import { NavLink } from "react-router-dom";
import { IconArrowBarLeft } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import InputError from "../error/inputError";
import inputAuthValidation from "../../services/InputAuthValidation";
import Swal from "sweetalert2";
import { IconEye,  IconEyeOff} from '@tabler/icons-react';




export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    nome: "",
    email: "",
    password: "",
  });

    const [showPassword, setShowPassword] = useState(false);
  
    const handleToggle = () => setShowPassword(!showPassword);



  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    // limpa o erro do campo quando o usuário começa a digitar
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = inputAuthValidation(form, "register");

    if (!validation.isValid) {
      setErrors(validation.errors); // exibe erros específicos
      return;
    }

    try {
      await adicionarUsuario(form.email, form.password, form.nome);

      Swal.fire({
      position: "center",
      icon: "success",
      title: "You are registered",
      text: "A email confirmation was sent",
      showConfirmButton: false,
      timer: 2000
    }).then(() => {
      navigate("/login");
    });
    } catch (err: any) {
      Swal.fire({
      position: "center",
      icon: "error",
      title: "Erro ao cadastrar usuário:",
      text: err.message,
      showConfirmButton: true,
      timer: 3000
    })
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
