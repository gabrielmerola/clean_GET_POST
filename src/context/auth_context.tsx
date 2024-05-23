/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";
import { AuthRepositoryHttp, LoginResponseType, UserResponsiveType } from "../api/repositories/auth_repository_http";



type AuthContextType = {
    login: (email: string, password: string) => Promise<LoginResponseType | undefined>;
    getAllUsers: () => Promise< UserResponsiveType[] | undefined>
};

const defaultAuthContext: AuthContextType = {
    login: async (_email: string, _password: string) => {
        return undefined
    },
    getAllUsers: async () => {
        return undefined;
    }
}

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);


export const AuthContextProvider = ({ children }: any) => { 
    const authRepository = new AuthRepositoryHttp();

    async function login(email: string, password: string) {
        try {
            const response = await authRepository.doLogin(email, password);
            console.log('rrsponse context', response)
            return response;
        } catch (error: any) {
            console.log("ERRO" + error);
            return error;
        }
    }

    async function getAllUsers() {
        try {
            const response = await authRepository.getAllUsers();
            console.log('response context', response)
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