import supabase from "../supabaseClient";
export async function loginUser(email: string, password: string) {

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;
  if (!data) throw new Error("Email não encontrado");

  localStorage.setItem("usuario", JSON.stringify({
    id: data.user.id,
    email: data.user.email
  }));

  return data.user;
}
