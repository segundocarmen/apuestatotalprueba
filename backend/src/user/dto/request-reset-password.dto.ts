import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RequestResetPasswordDto {
    @ApiProperty({
        description: 'Email of user',
        example: 'user@gmail.com'
    })
    @IsString()
    @IsEmail()
    readonly email: string;
}
