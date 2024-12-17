import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@entities/user-role.entity';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    isNotEmpty
} from 'class-validator';

const entity = 'user';

export class CreateUserDto {
    @ApiProperty({
        description: `Complete Name of ${entity}`,
        example: 'Carmen Dominguez Segundo'
    })
    @IsString()
    @IsNotEmpty()
    readonly completeName: string;

    @ApiProperty({
        description: `Email of ${entity}`,
        example: 'user@gmail.com'
    })
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty({
        description: `Password of ${entity}`,
        example: 'xxxxxxxx'
    })
    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @ApiProperty({
        description: `Phone of ${entity}`,
        example: '917491208'
    })
    @IsString()
    @IsOptional()
    readonly phone: string;

    @ApiProperty({
        description: `DocType of ${entity}`,
        example: 'xxxxxxxx'
    })
    @IsString()
    @IsOptional()
    readonly docType: string;

    @ApiProperty({
        description: `Doi of ${entity}`,
        example: 'xxxxxxxx'
    })
    @IsString()
    @IsOptional()
    readonly doi: string;

    @ApiProperty({
        description: `Address of ${entity}`,
        example: 'xxxxxxxx'
    })
    @IsString()
    @IsOptional()
    readonly address: string;

    @ApiProperty({
        description: `Role of ${entity}`,
        example: 'xxxxxxxxxx'
    })
    @IsString()
    @IsOptional()
    @IsUUID('4')
    readonly role: UserRole;

    @ApiProperty({
        description: `isOauth of ${entity}`,
        example: false
    })
    @IsOptional()
    readonly isOauth: boolean;

    @ApiProperty({
        description: `isGoogle of ${entity}`,
        example: false
    })
    @IsOptional()
    readonly isGoogle: boolean;

    @ApiProperty({
        description: `isMs of ${entity}`,
        example: false
    })
    @IsOptional()
    readonly isMs: boolean;

    @ApiProperty({
        description: `oauthId of ${entity}`,
        example: null
    })
    @IsString()
    @IsOptional()
    readonly oauthId: string;
}
