import { useState, useEffect } from "react";
import { Calendar, Modal, Badge } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import supabase from "../supabaseClient";

interface Todo {
  id: number;
  title: string;
  description: string | null;
  date_time: string;
  id_user: string;
  active: boolean;
  concluded: boolean;
  created_at: string;
}

export default function TodoCalendar() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔄 Busca tarefas
  const handleData = async () => {
  try {
    setLoading(true);
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (!user || userError) {
      console.error("Erro ao obter usuário:", userError);
      setTodos([]);
      return;
    }

    const { data, error } = await supabase
      .from("todo")
      .select("*")
      .eq("id_user", user.id) // <- filtra pelo usuário logado
      .order("date_time", { ascending: true });

    if (error) throw error;

    setTodos(data || []);
    console.log("Tarefas carregadas do usuário logado:", data);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    handleData();
    const atualizar = () => handleData();
    window.addEventListener("todoAtualizado", atualizar);
    return () => window.removeEventListener("todoAtualizado", atualizar);
  }, []);

  // 📅 Clicou na data
  const onSelect = (value: Dayjs) => {
    const tarefasDoDia = todos.filter((todo) =>
      dayjs(todo.date_time).isSame(value, "day")
    );
    setSelectedTasks(tarefasDoDia);
    setSelectedDate(value);
    setIsModalOpen(true);
  };

  // 🎨 Renderiza badges no calendário
  const dateCellRender = (date: Dayjs) => {
    const tarefasDoDia = todos.filter((todo) =>
      dayjs(todo.date_time).isSame(date, "day")
    );

    if (tarefasDoDia.length === 0) return null;

    return (
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {tarefasDoDia.slice(0, 3).map((todo) => (
          <li key={todo.id} style={{ marginBottom: 2 }}>
            <Badge className="font-semibold"
              
              status={todo.concluded ? "success" : "warning"}
              text={todo.title} // sem texto para não quebrar layout
            />
          </li>
        ))}
        {tarefasDoDia.length > 3 && <li className="text-gray-500 text-center inset-x-0 bottom-0 absolute">+{tarefasDoDia.length - 3} tarefas</li>}
      </ul>
    );
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <>
      <Calendar
        onSelect={onSelect}
        cellRender={(date) => dateCellRender(date)}
      />

      <Modal
        title={`Tarefas de ${selectedDate?.format("DD/MM/YYYY")}`}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {selectedTasks.length > 0 ? (
          selectedTasks.map((todo) => (
            <div
              key={todo.id}
              style={{
                marginBottom: 10,
                padding: 8,
                border: "1px solid #eee",
                borderRadius: 6,
              }}
            >
              <h4>{todo.title}</h4>
              <p>{todo.description}</p>
              <span>{dayjs(todo.date_time).format("HH:mm DD/MM/YYYY")}</span>
            </div>
          ))
        ) : (
          <p>Nenhuma tarefa para esta data.</p>
        )}
      </Modal>
    </>
  );
}