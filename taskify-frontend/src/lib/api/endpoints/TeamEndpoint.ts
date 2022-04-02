import sha256 from "sha256";
import ApiInstance from "..";

export default class TeamEndpoint {
    public static async CreateTeam(name: string) {
        return ApiInstance.post("/teams", {
            name: name,
        }).then(response => {
            return response
        }).catch((err) => {
            console.error(err);
            return err.response;
        });
    }
}
