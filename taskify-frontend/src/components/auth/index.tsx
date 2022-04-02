import { AxiosResponse } from "axios";
import React from "react";

export interface AuthContextType {
    user: any;
    login: (email: string, password: string) => Promise<AxiosResponse>;
    register: (email: string, password: string) => Promise<AxiosResponse>;
    logout(): void;
    setUser(user: any): void;
}

export const AuthContext = React.createContext<AuthContextType>(null!);

export function useAuth() {
    return React.useContext(AuthContext);
}
