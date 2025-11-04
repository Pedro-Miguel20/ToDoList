export default function inputValidation(form: any, type: "login" | "register") {
  const errors: any = {};
  let isValid = true;

  if (type === "login" || !form.nome?.trim()) {
    errors.nome = "O nome é obrigatório";
    isValid = false;
  }

  if (!form.email?.trim()) {
    errors.email = "O email é obrigatório";
    isValid = false;
  }

  if (!form.password?.trim()) {
    errors.password = "A senha é obrigatória";
    isValid = false;
  }

  return { isValid, errors };
}