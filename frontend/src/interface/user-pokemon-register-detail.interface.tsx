import { UserPokemonRegisterInterface } from './user-pokemon-register.interface';

export interface UserPokemonRegisterDetailInterface {
    id: string;
    pokemonId: string;
    pokemonName: string;
    pokemonPower: number;
    state: number;
    createdAt: string;
    updatedAt: string;
    userPokemonRegister: UserPokemonRegisterInterface;
}

export interface RegisterExcelImportInterface {
    pokemonId: string;
    pokemonName: string;
    pokemonPower: number;
}
