import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { CreateUserPokemonRegisterDto } from './create-user-pokemon-register.dto';

const entity = 'user-pokemon-register';

export class CreateManyUserPokemonRegisterDto {
    @ApiProperty({
        description: `List of ${entity}`,
        example: [
            {
                pokemonId: 'xxxxxxx',
                pokemonName: 'Pikachu',
                pokemonPower: 310
            }
        ]
    })
    @IsArray()
    readonly list: CreateUserPokemonRegisterDto[];
}
