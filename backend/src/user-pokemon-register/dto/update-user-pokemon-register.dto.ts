import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CreateUserPokemonRegisterDto } from './create-user-pokemon-register.dto';

const entity = 'user-pokemon-register';

export class UpdateUserPokemonRegisterDto extends PartialType(
    CreateUserPokemonRegisterDto
) {
    @ApiProperty({
        description: `Pokemon id of ${entity}`,
        example: 'xxx'
    })
    @IsString()
    readonly pokemonId: string;

    @ApiProperty({
        description: `Pokemon name of ${entity}`,
        example: 'xxx'
    })
    @IsString()
    readonly pokemonName: string;

    @ApiProperty({
        description: `Pokemon power of ${entity}`,
        example: 'xxx'
    })
    @IsNumber()
    readonly pokemonPower: number;
}
