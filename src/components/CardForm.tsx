import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import supabase from "../supabaseClient";

function CardForm(){
    const [date, setDate] = useState({ startDate: new Date(), endDate: null })
    const [description, setDescription] = useState("")
    const [title, setTitle] = useState("")


    const onHandleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const onHandleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async () => {
        if (!date.startDate) return;

        const formattedDate = new Date(date.startDate).toISOString().split("T")[0];

        const { error } = await supabase.from("todo").insert({
            title: title,
            description: description,
            data_marcada: formattedDate,
            horario: "21:59:34",
        });

        if (error) console.error(error);
        else {
            alert("Todo inserido!");
            setDescription("");
            setDate({ startDate: new Date(), endDate: null });
        }
    };

    return (
        <>
            <input
                type="text"
                placeholder="título"
                onChange={onHandleTitle}
                value={title}
                style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
            />
            <input
                type="text"
                placeholder="Descrição"
                onChange={onHandleDescription}
                value={description}
                style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
            />
                <Datepicker 
                        asSingle={true}
                        useRange={false}
                        value={date} 
                        onChange={newDate => setDate(newDate)}
                        displayFormat="DD/MM/YYYY"
                />
            <button onClick={handleSubmit}>Submit</button>
        </>
    )
}

export default CardForm;