import { loginUser } from "../services/login";

function Home() {
  return (
      <>
              <h1>Welcome {localStorage.getItem("usuario")}</h1>
      </>
  );
}

export default Home;