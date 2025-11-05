import supabase from '../lib/supabaseClient';

export const adicionarUsuario = async (email: string, password: string, nome: string) => {
  const emailTrimmed = email?.trim();
  if (!emailTrimmed) throw new Error("Informe um email válido");

  // 3️⃣ Insere o usuário no banco com senha criptografada
  const { data, error } = await supabase.auth.signUp({
    email: emailTrimmed,   // <- email na raiz
    password,
    options: {
      data: { nome }        // metadados extras
    }
  });

  if (error) {
    console.error('Supabase insert error:', error);
    throw error;
  }

  return data;
}
