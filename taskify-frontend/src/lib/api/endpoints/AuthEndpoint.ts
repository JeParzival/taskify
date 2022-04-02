import sha256 from "sha256";
import ApiInstance from "..";

export default class AuthEndpoint {
    public static async Register(email: string, password: string) {
        return ApiInstance.post("/register", {
            email: email,
            passwordHash: sha256(password),
        }).then(response => {
            return response
        }).catch((err) => {
            console.error(err);

            return err.response;
        });
    }

    public static async Login(email: string, password: string) {
        return ApiInstance.post("/register", {}, {
            auth: {
                username: email,
                password: sha256(password)
            }
        }).then(response => {
            return response
        }).catch((err) => {
            console.error(err);
            return err.response;
        });
    }
}
