import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

const entity = 'user role';

export class CreateUserRoleDto {
    @ApiProperty({
        description: `Name of ${entity}`,
        example: 'Admin'
    })
    @IsString()
    readonly name: string;

    @ApiProperty({
        description: `Initial section of ${entity}`,
        example: 'xxxxxxxxxx'
    })
    @IsString()
    readonly initialSection: string;
}
