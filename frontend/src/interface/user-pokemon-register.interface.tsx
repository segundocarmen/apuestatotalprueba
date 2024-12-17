import { UserInterface } from './user.interface';

export interface UserPokemonRegisterInterface {
    id: string;
    accepted: string;
    registeredCount: number;
    state: number;
    createdAt: string;
    updatedAt: string;
    user: UserInterface;
}

export interface UserPokemonRegisterFormCreateInterface {
    pokemonId: string;
    pokemonName: string;
    pokemonPower: string;
}

export const UserPokemonRegisterFormValues: UserPokemonRegisterFormCreateInterface =
    {
        pokemonId: '',
        pokemonName: '',
        pokemonPower: '',
    };
