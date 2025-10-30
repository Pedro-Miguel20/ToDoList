import { useState, useEffect } from "react";
import supabase from "../supabaseClient";

export default function TodoList() {
  const [todos, setTodos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function handleData() {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (!user || userError) {
      console.error(userError);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("todo")
      .select("*")
      .eq("id_user", user.id);

    if (error) console.error(error);
    setTodos(data || []);
    setLoading(false);
  }

  // ⬇️ useEffect garante que isso rode apenas uma vez
  useEffect(() => {
    handleData();

    // ⬇️ escuta o evento disparado após o insert
    const atualizar = () => handleData();
    window.addEventListener("todoAtualizado", atualizar);

    return () => window.removeEventListener("todoAtualizado", atualizar);
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="container-full p-5 overflow-x-auto">
      <ul className="flex gap-2">
        {todos.map((todo: any) => (
          <a href="/" key={todo.id ?? `${todo.title}-${todo.date_time}`}>
            <li className="block w-96 max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {todo.title}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {todo.description}
              </p>
              <span className="font-lg text-gray-600 dark:text-gray-400">
                {todo.date_time}
              </span>{" "}
              - {todo.concluded ? "Concluded" : "Not concluded"}
            </li>
          </a>
        ))}
      </ul>
    </div>
  );
}