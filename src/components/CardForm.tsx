import { useState, useEffect } from "react";
import supabase from "../supabaseClient";
import { DatePicker } from "antd";
import dayjs from "dayjs";

function CardForm(){
    const [datahora, setDataHora] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null);
    const [descricao, setDescricao] = useState("")
    const [titulo, setTitulo] = useState("")
    const [userId, setUserId] = useState<number | null>(null)

    useEffect(() => {
        const getUserId = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: userData } = await supabase
                    .from('usuarios')
                    .select('id')
                    .eq('email', user.email || '')
                    .single();
                if (userData) {
                    setUserId(userData.id);
                }
            }
        };
        getUserId();
    }, []);


    const onHandleTitulo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitulo(event.target.value);
    };

    const onHandleDescricao = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescricao(event.target.value);
    };

    const handleSubmit = async () => {
        if (!datahora || !userId) {
            alert("Por favor, aguarde o carregamento dos dados do usuário");
            return;
        }

        const formattedDate = new Date(datahora).toISOString();

        const { error } = await supabase.from("todo").insert({
            titulo: titulo,
            descricao: descricao,
            data_hora: formattedDate,
            id_usuario: userId,
            feito: false
        });

        if (error) console.error(error);
        else {
            alert("Todo inserido!");
            setDescricao("");
            setTitulo("");
            setDataHora({ startDate: new Date(), endDate: null });
        }
    };

    return (
        <>
        <div className="container flex flex-col mx-auto p-4 border border-gray-300 rounded-lg shadow-md bg-[ghostwhite]">
            <input
                className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-blue-400"
                type="text"
                placeholder="título"
                onChange={onHandleTitulo}
                value={titulo}
                style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
            />
            <input
                className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-blue-400"
                type="text"
                placeholder="Descrição"
                onChange={onHandleDescricao}
                value={descricao}
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

export default CardForm;