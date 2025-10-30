import React, { useState, useEffect } from "react";
import supabase from "../supabaseClient";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import Swal from "sweetalert2";

function TodoForm(){
    const [datahora, setDataHora] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null);
    const [descricao, setDescricao] = useState("")
    const [titulo, setTitulo] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formattedDate = new Date(datahora).toISOString();
        const { error } = await supabase.from("todo").insert({
            title: titulo,
            description: descricao,
            date_time: formattedDate,
            concluded: false
        });
        if (error) console.error(error);
        else {
            Swal.fire({
                title: "You add a new activity!",
                text: `${titulo} - ${datahora}`,
                icon: "success"
            });
            window.dispatchEvent(new Event("todoAtualizado"));
        }
    };

    return (
        <>
        <div className="container flex flex-col mx-auto p-4 border border-gray-300 rounded-lg shadow-md bg-[ghostwhite]">
            <input
                className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-blue-400"
                type="text"
                placeholder="título"
                value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
            />
            <input
                className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-blue-400"
                type="text"
                placeholder="Descrição"
                value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
            />
                <div className="flex flex-row gap-4 mb-4">
                    <DatePicker
                    showTime
                    value={datahora} 
                    onChange={newDate => setDataHora(newDate)}
                    />
                </div>
            <button onClick={handleSubmit} className="text-white m-4 bg-blue-700 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Submit</button>
        </div>
        </>
    )
}

export default TodoForm;