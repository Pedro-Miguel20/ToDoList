import supabase from '../supabaseClient';
import Swal from 'sweetalert2'

export const adicionarUsuario = async (email: string, password: string, nome: string) => {
  const emailTrimmed = email?.trim();
  if (!emailTrimmed) throw new Error("Informe um email válido");

  if (password.length < 6) {
    throw new Error('A senha deve ter pelo menos 6 caracteres');
  }

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
  } else {
    window.location.href = "/login";
  }

  return data;
}
