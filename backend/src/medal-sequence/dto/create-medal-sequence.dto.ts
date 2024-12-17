import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

const entity = 'medal-sequence';

export class CreateMedalSequenceDto {
    @ApiProperty({
        description: `Name of ${entity}`,
        example: 'MADERA'
    })
    @IsString()
    readonly name: string;

    @ApiProperty({
        description: `Pokemon number of ${entity}`,
        example: 10
    })
    @IsNumber()
    readonly count: number;
}
