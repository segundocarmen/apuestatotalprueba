import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ActivateUserDto {
    @IsNotEmpty()
    @IsUUID('4')
    @IsString()
    readonly id: string;

    @IsNotEmpty()
    @IsUUID('4')
    @IsString()
    readonly statusCode: string;
}
