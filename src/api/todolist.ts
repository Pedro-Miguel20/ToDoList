import supabase from "../lib/supabaseClient";

export async function getTodoList(user_id: string){
    const { data, error } = await supabase
        .from("todo")
        .select("*")
        .eq("active", true) 
        .eq("id_user", user_id)
        .order("date_time", { ascending: true });
    
    if (error) {
        console.error("Erro ao buscar todos:", error);
        return [];
    }
    
    return data || error
}