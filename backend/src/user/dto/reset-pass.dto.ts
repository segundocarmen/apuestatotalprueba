import { User } from '@entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ResetPassDto {
    @ApiProperty({
        description: `User`,
        example: 'xxxxxxxxxx'
    })
    @IsString()
    @IsUUID('4')
    readonly user: User;

    @IsNotEmpty()
    @IsString()
    readonly lastPassword: string;

    @IsNotEmpty()
    @IsString()
    readonly newPassword: string;

    @IsNotEmpty()
    @IsString()
    readonly newPasswordConfirm: string;
}
