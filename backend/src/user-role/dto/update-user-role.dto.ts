import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateUserRoleDto } from './create-user-role.dto';

const entity = 'user role';

export class UpdateUserRoleDto extends PartialType(CreateUserRoleDto) {
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
