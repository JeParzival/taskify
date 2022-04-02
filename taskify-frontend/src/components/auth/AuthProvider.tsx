import React from "react";
import { AuthContext } from ".";
import AuthEndpoint from "../../lib/api/endpoints/AuthEndpoint";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    let [user, setUser] = React.useState<any>(null);

    let login = (email: string, password: string) => {
        return AuthEndpoint.Login(email, password);
    };

    let register = (email: string, password: string) => {
        return AuthEndpoint.Register(email, password);
    }

    let logout = () => {
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("password");

        setUser(null);
    };

    let value = { user, register: register, login: login, logout: logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}