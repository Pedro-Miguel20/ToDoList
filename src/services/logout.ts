
export function Logout() {
  // Remove o usuário do localStorage
  localStorage.removeItem("usuario");

  // Opcional: redireciona para a página de login
  window.location.href = "/login";
}