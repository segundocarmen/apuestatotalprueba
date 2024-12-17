import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ValidateDto {
    @ApiProperty({
        description: 'Token of user',
        example: 'xxxxxxxx'
    })
    @IsString()
    readonly token: string;
}
