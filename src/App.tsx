import { useContext, useEffect, useState } from "react";
// import { LoginResponseType } from "./api/repositories/auth_repository_http";
import { AuthContext } from "./context/auth_context";
import { toast } from "react-toastify";
import { UserResponsiveType } from "./api/repositories/auth_repository_http";



export default function App() {
  const { login, getAllUsers } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState<UserResponsiveType[]>();

  async function getAllUsersOnPage() {
    const response = await getAllUsers();
    console.log('response', response)
    setData(response)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) console.log('Token não encontrado')
    getAllUsersOnPage()
  }, [])

  async function handleLogin(email: string, password: string) {
    const response = await login(email, password);
    console.log('login tsx', response)
    localStorage.setItem('token', response?.token ?? "")
    toast('Login realizado com  sucesso', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  return (
    <main className="bg-gray-100 min-h-screen">
      <section className="p-8 flex flex-col items-center">
        <h1 className="mb-4 text-3xl font-bold">Login</h1>
        <div className="flex gap-4 justify-center">
          <input className="border-2 border-blue-500 rounded-md p-1" type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
          <input className="border-2 border-blue-500 rounded-md p-1" type="password" placeholder="Senha" required onChange={(e) => setPassword(e.target.value)} />
          <button className="bg-green-500 p-2 rounded-lg font-bold text-white hover:bg-green-600" onClick={() => handleLogin(email, password)}>Capturar token</button>

        </div>
        <p className="mt-8">token se validar ou mensagem</p>
      </section>

      <section className="flex flex-col items-center justify-center">
        <h1 className="mb-4 text-3xl font-bold">Usuários</h1>

        <aside className="flex gap-4 flex-wrap justify-center items-center">
          {/* CARD */}
          {data?.map((user) => {
            return (
              <div className="bg-white p-4 w-72 rounded-xl shadow-lg">
                {/* CABEÇALHO */}
                <header className="flex items-center justify-between border-b-2 mb-2">
                  <h2>{user.name}</h2>
                  <div className="bg-green-500 h-3 w-3 rounded-full" />
                </header>

                {/* CORPO */}
                <body className="flex flex-col">
                  <label>{user.id}</label>
                  <label>{user.email}</label>
                </body>

                {/* RODAPÉ */}
                <footer className="flex justify-evenly mt-4">
                  <button className="bg-blue-500 p-2 rounded-lg font-bold text-white hover:bg-blue-600">Editar</button>
                  <button className="bg-red-500 p-2 rounded-lg font-bold text-white hover:bg-red-600">Excluir</button>
                </footer>
              </div>
            )
          })}
        </aside>
      </section>
    </main>
  )
}