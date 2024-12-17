import { HeadersInterface } from '@/components/page/data-viewer/interface/table.interface';

export const PokemonRegisterTable: HeadersInterface[] = [
    {
        dataField: 'id',
        text: 'Código',
    },
    {
        dataField: 'registeredCount',
        text: 'Registrados',
    },
    {
        dataField: 'accepted',
        text: 'Estado',
    },
];

export const PokemonRegisterListTable: HeadersInterface[] = [
    {
        dataField: 'pokemonId',
        text: 'PokemonId',
    },
    {
        dataField: 'pokemonName',
        text: 'PokemonName',
        addclass: true,
    },
    {
        dataField: 'pokemonPower',
        text: 'PokemonPower',
    },
];
