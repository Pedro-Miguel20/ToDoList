import supabase from "../supabaseClient";
import bcrypt from "bcryptjs";

export async function loginUser(email: string, password: string) {
  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error("Email não encontrado");

  const senhaValida = await bcrypt.compare(password, data.password);
  if (!senhaValida) throw new Error("Senha incorreta");

  localStorage.setItem("usuario", JSON.stringify({
    id: data.id,
    nome: data.nome,
    email: data.email
  }));

  return data;
}
