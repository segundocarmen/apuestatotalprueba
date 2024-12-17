export const Constants = {
    httpDefaulResOnError: { data: [] },
    toastDelayTime: 3,
    protected: {
        PokemonRegister: './pokemon-register',
        DashBoardAdmin: './dashboard',
    },
    loginUrl: '/login',
};

export const HTTP_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
};

export interface DoiInterface {
    id: string;
    value: string;
}

export const DOI_COLLECTION: DoiInterface[] = [
    { id: 'DNI', value: 'DNI' },
    { id: 'RUC', value: 'RUC' },
    { id: 'CEX', value: 'CEX' },
];

export const DOI_COLLECTION_VALUES = {
    DNI: 'DNI',
    RUC: 'RUC',
    CEX: 'CEX',
};

export const REGISTERSTATE_COLLECTION_VALUES = {
    ACEPTADO: 'ACEPTADO',
    DENEGADO: 'DENEGADO',
};
