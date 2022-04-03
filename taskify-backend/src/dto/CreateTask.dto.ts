import { IsBoolean, IsDate, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
    @IsString()
    content: string;

    @IsDate()
    @IsOptional()
    expiresAt: Date;

    @IsBoolean()
    @IsOptional()
    complated: boolean = false;
}
