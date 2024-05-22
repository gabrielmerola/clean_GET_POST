import { AxiosResponse } from "axios";
import { api } from "../http";

export interface LoginType {
    token: string;
};


export class AuthRepositoryHttp {
    async doLogin(email: string, password: string) {
        try {
            if (!email || !password) {
                return {
                    status: 422,
                    message: "Preencha todos os campos",
                    token: "Token inválida "
                };
            }
            const result: AxiosResponse = await api.post<LoginType>("/auth-user", {
                email,
                password
            });
            // console.log("teste token: ", result.data);
            return {
                token: result.data.token
            };
        } catch (error: any) {
            throw new Error(error);
        }
    }
}