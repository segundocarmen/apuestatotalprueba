export const ApiUserPokemonRegister = `${process.env.NEXT_PUBLIC_SERVICE}/user-pokemon-register`;
export const ApiUserPokemonRegisterPendings = `${process.env.NEXT_PUBLIC_SERVICE}/user-pokemon-register/pendings`;
export const ApiUserPokemonRegisterId = (id: string) =>
    `${process.env.NEXT_PUBLIC_SERVICE}/user-pokemon-register/${id}`;
export const ApiUserPokemonRegisterByUserId = (id: string) =>
    `${process.env.NEXT_PUBLIC_SERVICE}/user-pokemon-register/by-user/${id}`;
