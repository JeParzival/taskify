import { useEffect, useState } from "react";
import { useAuth } from ".";

export default function RequireAuth({ children }: { children: JSX.Element }) {
    let [loading, setLoading] = useState(true);

    let auth = useAuth();

    let email = window.localStorage.getItem("email")!;
    let password = window.localStorage.getItem("password")!;

    useEffect(() => {
        auth.login(email, password).then((response) => {
            if (response.status == 200) {
                auth.setUser(response.data);
                setLoading(false);
            } else {
                window.localStorage.removeItem("email");
                window.localStorage.removeItem("password");

                setLoading(false);
            }
        });
    }, [])

    if (loading) {
        return <div></div>;
    } else {
        return children;
    }
}
