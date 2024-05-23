/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../http";


export type LoginResponseType = {
    token: string;
};

export type UserResponsiveType = {
    name: string,
    email: string,
    id: string
};


export class AuthRepositoryHttp {
    async doLogin(email: string, password: string) {
        try {
            const result = await api.post<LoginResponseType>("/auth-user", {
                email,
                password
            });
            console.log("teste token: ", result.data);
            return result.data
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async getAllUsers() {
        try {
            const response = await api.get<UserResponsiveType[]>("/users-list");
            return response.data;
        } catch (error: any){
            console.log("Error: "+error);
            throw new Error(error);
        }
    }

}