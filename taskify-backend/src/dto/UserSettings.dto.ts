import { IsOptional, IsString } from "class-validator";

export class UserSettingsDto {
    @IsString()
    @IsOptional()
    fullName: string;

    @IsString()
    @IsOptional()
    featuredTeam: string;

    @IsString()
    @IsOptional()
    title: string;
}
