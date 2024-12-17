export const ApiUserPokemonRegisterDetail = `${process.env.NEXT_PUBLIC_SERVICE}/user-pokemon-register-detail`;
export const ApiUserPokemonRegisterDetailId = (id: string) =>
    `${process.env.NEXT_PUBLIC_SERVICE}/user-pokemon-register-detail/${id}`;
export const ApiUserPokemonRegisterDetailByRegisterId = (id: string) =>
    `${process.env.NEXT_PUBLIC_SERVICE}/user-pokemon-register-detail/by-register/${id}`;
