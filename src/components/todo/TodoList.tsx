import { useState, useEffect } from "react";
import { Calendar, Modal, Badge, Button, Popover,  Flex, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import supabase from "../../lib/supabaseClient";
import TodoForm from "./TodoForm";
import DeleteButton from "./DeleteButton";

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
  const [popoverVisible, setPopoverVisible] = useState<number | null>(null);

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
        .eq("active", true) 
        .eq("id_user", user.id)
        .order("date_time", { ascending: true });

      if (error) throw error;
      setTodos(data || []);
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

  // 🎨 Renderiza badges e o popover em cada célula
  const dateCellRender = (date: Dayjs) => {
    const tarefasDoDia = todos.filter((todo) =>
      dayjs(todo.date_time).isSame(date, "day")
    );

    const cellContent = (
      <div
        style={{
          minHeight: 60,
          position: "relative",
          cursor: "pointer",
        }}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedDate(date);
          setPopoverVisible(date.valueOf());
        }}
      >
        {tarefasDoDia.length > 0 && (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {tarefasDoDia.slice(0, 3).map((todo) => (
              <li key={todo.id}>
                <Badge
                  status={todo.concluded ? "success" : "warning"}
                  text={todo.title}
                />
              </li>
            ))}
            {tarefasDoDia.length > 3 && (
              <li style={{ color: "gray", fontSize: 12 }}>
                +{tarefasDoDia.length - 3} tarefas
              </li>
            )}
          </ul>
        )}
      </div>
    );

    // conteúdo do popover
    const popoverContent = (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <TodoForm date={date.toISOString()} />
        <Button
          onClick={() => {
            const tarefasDoDia = todos.filter((todo) =>
              dayjs(todo.date_time).isSame(date, "day")
            );
            setSelectedTasks(tarefasDoDia);
            setIsModalOpen(true);
            setPopoverVisible(null);
          }}
        >
          Ver tarefas
        </Button>
      </div>
    );

    return (
      <Popover
        content={popoverContent}
        title={date.format("DD/MM/YYYY")}
        trigger="click"
        open={popoverVisible === date.valueOf()}
        onOpenChange={(visible) =>
          setPopoverVisible(visible ? date.valueOf() : null)
        }
      >
        {cellContent}
      </Popover>
    );
  };

  if (loading) return (
    <Spin className="absolute top-[50%] left-[50%] transform-[translate(-50%, -50%)]" indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />);

  return (
    <>
      <Calendar cellRender={dateCellRender} />

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
            > <div className="flex w-full justify-between align-items">
              <h2 className="text-lg fw-bolder">{todo.title}</h2>
              <DeleteButton
                id={todo.id}
                active={todo.active}
                onUpdate={() => {
                    // Atualiza modal
                    setSelectedTasks(prev => prev.filter(t => t.id !== todo.id));
                    // Atualiza calendário
                    setTodos(prev => prev.filter(t => t.id !== todo.id));
                  }}
              />
              </div>
              <p>{todo.description}</p>
              <span>{dayjs(todo.date_time).format("HH:mm DD/MM/YYYY")}</span>
            </div>
          ))
        ) : (
          <p>Nenhuma tarefa para esta data.</p>
        )}

        <TodoForm/>
      </Modal>
    </>
  );
}