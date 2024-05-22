import { useContext } from "react";
import  LoginType  from "../api/repositories/auth_repository_http"



export function App() {
  const { login } = useContext(AuthContext);


  useEffect(() => {
    async function loginVerify() {
        // await AsyncStorage.removeItem("token");
        const response = await validateToken();
        if (response) {
            navigation.navigate("StackRoutes");
        }
    }
    loginVerify();
});

  async function handleLogin() {
    if (!email || !password) {
      return;
  }

    const response = await login(email, password);
    
    if (response.token) {
      const { token } = result;
      await AsyncStorage.setItem("token", token);
      // console.log(token);
      navigation.navigate("StackRoutes");
      toast.show({
          title: "Login realizado com sucesso",
          description: "Você já pode acessar o app",
          backgroundColor: "green.500",
          placement: "top"
      });
  } else {
      toast.show({
          title: "Erro no login",
          description: "O email ou senha não conferem",
          backgroundColor: "red.500",
          placement: "top"
      });
  }

  }

  
  return (
    <main className="bg-gray-100 min-h-screen">
      <section className="p-8 flex flex-col items-center">
        <h1 className="mb-4 text-3xl font-bold">Login</h1>
        <div className="flex gap-4 justify-center">
          <input className="border-2 border-blue-500 rounded-md p-1" type="email" placeholder="Email" required />
          <input className="border-2 border-blue-500 rounded-md p-1" type="password" placeholder="Senha" required />
          <button className="bg-green-500 p-2 rounded-lg font-bold text-white hover:bg-green-600" onClick={handleLogin} >Capturar token</button>

        </div>
          <p className="mt-8">token se validar ou mensagem</p>
      </section>

      <section className="flex flex-col items-center justify-center">
        <h1 className="mb-4 text-3xl font-bold">Usuários</h1>

        <aside className="flex gap-4 flex-wrap justify-center items-center">
          {/* CARD */}
          <div className="bg-white p-4 w-72 rounded-xl shadow-lg">
            {/* CABEÇALHO */}
            <header className="flex items-center justify-between border-b-2 mb-2">
              <h2>Nome do usuário</h2>
              <div className="bg-green-500 h-3 w-3 rounded-full" />
            </header>

            {/* CORPO */}
            <body className="flex flex-col">
              <label>email do usuario</label>
              <label>role do usuario</label>
              <label>telefone do usuario</label>
              <label>cpf do usuario</label>
            </body>

            {/* RODAPÉ */}
            <footer className="flex justify-evenly mt-4">
              <button className="bg-blue-500 p-2 rounded-lg font-bold text-white hover:bg-blue-600">Editar</button>
              <button className="bg-red-500 p-2 rounded-lg font-bold text-white hover:bg-red-600">Excluir</button>
            </footer>
          </div>
        </aside>

      </section>
    </main>
  )
}