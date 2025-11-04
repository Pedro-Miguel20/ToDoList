import { useState } from "react";
import { deleteTodoItem } from "../../api/deleteTodo";
import {Button} from "antd"

interface DeleteButtonProps {
  id: number;
  active: boolean;
  onUpdate?: () => void;
}

export default function DeleteButton({ id, active, onUpdate }: DeleteButtonProps) {
  const [activeState, setActiveState] = useState(active);
  const [loading, setLoading] = useState(false);

  const loginUser = localStorage.getItem("usuario");

  async function handleDelete() {
    if (!loginUser) return;
    
    setLoading(true);

    try {
      const { data, error } = await deleteTodoItem(id);

      if (error) throw error;

      setActiveState(false);

      // Atualiza lista no componente pai, se existir
      if (onUpdate) onUpdate();

      console.log("Tarefa deletada/desativada com sucesso:", data);
    } catch (err) {
      console.error("Erro ao deletar tarefa:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button danger onClick={handleDelete} disabled={!activeState || loading}>
      {loading ? "Deleting..." : activeState ? "Delete" : "Deleted"}
    </Button>
  );
}
