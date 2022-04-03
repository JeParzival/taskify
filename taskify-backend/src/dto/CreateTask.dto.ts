import { IsBoolean, IsDate, IsString } from "class-validator";

export class CreateTaskDto {
    @IsString()
    content: string;

    @IsDate()
    expiresAt: Date;

    @IsBoolean()
    completed: boolean;
}
