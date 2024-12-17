import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from '@src/user/dto/create-user.dto';
import {
    IsBoolean,
    IsEmail,
    IsOptional,
    IsString,
    IsUUID
} from 'class-validator';

class OauthDto {
    @ApiProperty({
        description: 'Is Google',
        example: true,
        nullable: true
    })
    @IsBoolean()
    @IsOptional()
    readonly isGoogle: boolean;

    @ApiProperty({
        description: 'Is Microsoft',
        example: true,
        nullable: true
    })
    @IsString()
    @IsOptional()
    readonly isMs: boolean;

    @ApiProperty({
        description: `Oauth Id`,
        example: 'xxxxxxxxxx',
        nullable: true
    })
    @IsString()
    @IsOptional()
    readonly oauthId: string;
}

export class AuthDto {
    @ApiProperty({
        description: 'Email of user',
        example: ''
    })
    @IsString()
    @IsEmail()
    readonly email: string;

    @ApiProperty({
        description: 'Password of user',
        example: ''
    })
    @IsString()
    readonly password: string;

    @ApiProperty({
        description: `Oauth`,
        example: {
            isGoogle: true,
            isMs: false,
            oauthId: 'xxxxxxxxxx'
        },
        required: false,
        nullable: true
    })
    @IsOptional()
    readonly oauth: OauthDto;

    @ApiProperty({
        description: `registerData`,
        required: false,
        nullable: true
    })
    @IsOptional()
    readonly registerData: CreateUserDto;
}

