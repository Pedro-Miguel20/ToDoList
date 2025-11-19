import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getTodoList } from "../api/todolist";
import dayjs from "dayjs";
import supabase from "../lib/supabaseClient";

type Todo = {
  id: number;
  title: string;
  description: string | null;
  date_time: string;
  created_at: string;
  active: boolean;
  concluded: boolean;
  id_user: string;
};

function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [userId, setUserId] = useState("");

  // PEGAR USUÁRIO
  useEffect(() => {
    async function loadUser() {
      const { data, error } = await supabase.auth.getUser();
      if (!error) setUserId(data.user?.id ?? null);
    }
    loadUser();
  }, []);

  // PEGAR LISTA
  useEffect(() => {
    if (!userId) return;

    async function fetchData() {
      const list = await getTodoList(userId);

      const sorted = [...list].sort(
        (a, b) => dayjs(a.date_time).valueOf() - dayjs(b.date_time).valueOf()
      );

      setTodos(sorted);
    }

    fetchData();
  }, [userId]);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key="cards"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.3 }}
          className="p-10 w-full h-full"
        >
          <h1 className="text-3xl font-bold mb-8 text-center">
            Your appointments
          </h1>

          {/* LISTA HORIZONTAL */}
          <div className="flex gap-8 overflow-x-auto px-4 pb-4">
            {todos.map((todo) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="min-w-[250px] bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
              >
                <p className="text-gray-500 text-sm font-medium">
                  {dayjs(todo.date_time).format("DD/MM • HH:mm")}
                </p>

                <h3 className="mt-2 font-semibold text-lg">
                  {todo.title}
                </h3>

                {todo.description && (
                  <p className="text-gray-600 text-sm mt-1">
                    {todo.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default Home;
