import supabase from "../lib/supabaseClient";

export async function addTodo(formattedDate: string, descricao: string, titulo: string){
    const { data, error } = await supabase.from("todo").insert({
          title: titulo,
          description: descricao,
          date_time: formattedDate,
          concluded: false,
    });

    return data || error
}