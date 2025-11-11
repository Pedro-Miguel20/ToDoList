export default function inputAuthValidation(form: any, type: "login" | "register") {
  const errors: any = {};
  let isValid = true;

  if (type === "register"){
    if(!form.nome?.trim()){
      errors.nome = "Name is required";
      isValid = false;
    }
    if (form.password?.length < 8) {
      errors.password = 'Atlest 8 characters';
      isValid = false;
    }
  }

  if (!form.email?.trim()) {
    errors.email = "Email is required";
    isValid = false;
  }
  if(!form.email)

  if (!form.password?.trim()) {
    errors.password = "Password is required";
    isValid = false;
  }

  return { isValid, errors };
}