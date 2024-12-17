import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

const entity = 'app section';

export class CreateAppSectionDto {
    @ApiProperty({
        description: `Name of ${entity}`,
        example: 'App section'
    })
    @IsString()
    readonly name: string;

    @ApiProperty({
        description: `Path of ${entity}`,
        example: 'this-is-a-path'
    })
    @IsString()
    readonly path: string;
}
