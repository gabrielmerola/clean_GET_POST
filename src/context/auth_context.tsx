import { createContext } from "react";
import { AuthRepositoryHttp, LoginType } from "../api/repositories/auth_repository_http";


type AuthContextType = {
    login: (email: string, password: string) => Promise<LoginType | undefined>;
    getAllUsers: () => Promise<[] | undefined>
};

const defaultAuthContext: AuthContextType = {
    login: async (_email: string, _password: string) => {
        return {token: ""};
    },
    getAllUsers: async () => {
        return [];
    }
}

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);


export const AuthContextProvider = ({ children }: any) => { 
    const authRepository = new AuthRepositoryHttp();

    async function login(email: string, password: string) {
        try {
            const response = await authRepository.doLogin(email, password);
            console.log("STATUS" + response.status);
            return response;
        } catch (error: any) {
            console.log("ERRO" + error);
            return error;
        }
    }

    async function getAllUsers() {
        try {
            const response = await authRepository.getAllUsers();
            console.log("STATUS" + response.status);
            return response;
        } catch (error: any) {
            console.log("ERRO" + error);
        }
    }

  

    return (
        <AuthContext.Provider
            value={{
                login,
                getAllUsers
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}