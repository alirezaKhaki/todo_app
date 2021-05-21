import { IsString, MaxLength, MinLength } from "class-validator";

export class AuthDto{
    @IsString()
    @MinLength(4)
    @MaxLength(25)
    username:string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    password:string;
}