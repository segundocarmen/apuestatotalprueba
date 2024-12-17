import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ResetPasswordDto {
    @ApiProperty({
        description: 'Reset password token',
        example: 'xxxxxxxxx'
    })
    @IsNotEmpty()
    @IsUUID('4')
    @IsString()
    readonly resetPasswordToken: string;

    @ApiProperty({
        description: 'Password of user',
        example: 'xxxx'
    })
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}
