import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from ".";

export default function RequireAuth({ children }: { children: JSX.Element }) {
    let location = useLocation();
    let auth = useAuth();

    let email = window.localStorage.getItem("mail")!;
    let password = window.localStorage.getItem("password")!;

    useEffect(() => {
        auth.login(email, password).then((response) => {
            if (response.status == 200) {
                auth.setUser(response.data);
            } else {
                window.localStorage.removeItem("mail");
                window.localStorage.removeItem("password");

                window.location.href = '/login';
            }
        });
    }, []);


    if (email && password) {
        return children;
    }

    if (!auth.user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
