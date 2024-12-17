import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';
import { CreateUserPokemonRegisterDetailDto } from './create-user-pokemon-register-detail.dto';
import { UserPokemonRegister } from '@entities/user-pokemon-register.entity';

const entity = 'user-pokemon-register-detail';

export class UpdateUserPokemonRegisterDetailDto extends PartialType(
    CreateUserPokemonRegisterDetailDto
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

    @ApiProperty({
        description: `UserPokemonRegister of ${entity}`,
        example: 'xxxxxxxxxx'
    })
    @IsString()
    @IsUUID('4')
    readonly userPokemonRegister: UserPokemonRegister;
}
