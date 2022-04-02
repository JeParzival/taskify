import { UserDocument } from "@schemas/User.schema";

declare global {
    namespace Express {
        export interface Request {
            user?: UserDocument = null;
        }
    }
}
