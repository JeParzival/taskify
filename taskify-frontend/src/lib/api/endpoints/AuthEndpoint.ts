import ApiInstance from "..";

export default class AuthEndpoint {
    public static async Register(email: string, password: string) {
        return ApiInstance.post("/register", {
            email: email,
            password: password,
        }).then(response => {
            return response
        }).catch((err) => {
            console.error(err);

            return err.response;
        });
    }

    public static async Login(email: string, password: string) {
        return ApiInstance.get("/login", {
            auth: {
                username: email,
                password: password
            }
        }).then(response => {
            return response
        }).catch((err) => {
            console.error(err);
            return err.response;
        });
    }
}
