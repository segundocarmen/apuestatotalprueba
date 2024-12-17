import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CreateMedalSequenceDto } from './create-medal-sequence.dto';

const entity = 'user-pokemon-register';

export class UpdateMedalSequenceDto extends PartialType(
    CreateMedalSequenceDto
) {
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
