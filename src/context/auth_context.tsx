import { createContext } from "react";
import { AuthRepositoryHttp } from "../api/repositories/auth_repository_http";
import React from "react";


type AuthContextType = {
    login: (email: string, password: string) => Promise<object | undefined>;
};

const defaultAuthContext: AuthContextType = {
    login: async (email: string, password: string) => {
        return {};
    }
}

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);


export const AuthContextProvider = ({ children }: any) => { 
    const authRepository = new AuthRepositoryHttp();

    async function login(email: string, password: string) {
        try {
            const response = await authRepository.doLogin(email, password);
            console.log(response.status);
            return response;
        } catch (error: any) {
            console.log(error);
        }
    }

  

    return (
        <AuthContext.Provider
            value={{
                login
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}