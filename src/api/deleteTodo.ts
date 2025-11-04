import supabase from "../lib/supabaseClient";

export async function deleteTodoItem(id: number) {
  return supabase
    .from("todo")
    .update({ active: false }) // ou .delete() se quiser remover
    .eq("id", id)
    .select("*")
}