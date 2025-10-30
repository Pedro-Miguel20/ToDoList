import React, { useState } from "react";
import supabase from "../supabaseClient";
import { DatePicker, Modal, Button } from "antd";
import dayjs from "dayjs";
import Swal from "sweetalert2";

export default function TodoForm() {
  const [datahora, setDataHora] = useState<dayjs.Dayjs | null>(null);
  const [descricao, setDescricao] = useState("");
  const [titulo, setTitulo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!datahora) {
      Swal.fire({
        icon: "warning",
        title: "Selecione uma data!",
      });
      return;
    }

    const formattedDate = datahora.toISOString();

    const { error } = await supabase.from("todo").insert({
      title: titulo,
      description: descricao,
      date_time: formattedDate,
      concluded: false,
    });

    if (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Erro ao adicionar atividade",
        text: error.message,
      });
    } else {
      Swal.fire({
        title: "Atividade adicionada!",
        text: `${titulo} - ${datahora.format("DD/MM/YYYY HH:mm")}`,
        icon: "success",
      });
      window.dispatchEvent(new Event("todoAtualizado"));
      setTitulo("");
      setDescricao("");
      setDataHora(null);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Adicionar atividade
      </Button>

      <Modal
        title="Nova Atividade"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col mx-auto p-4 border border-gray-300 rounded-lg shadow-md bg-[ghostwhite]"
        >
          <input
            className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-blue-400 mb-2"
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <input
            className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-blue-400 mb-2"
            type="text"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <div className="flex flex-row gap-4 mb-4">
            <DatePicker
              showTime
              value={datahora}
              onChange={(newDate) => setDataHora(newDate)}
            />
          </div>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-700 hover:bg-blue-600 text-white"
          >
            Salvar
          </Button>
        </form>
      </Modal>
    </>
  );
}
