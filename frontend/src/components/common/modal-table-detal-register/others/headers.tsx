import { HeadersInterface } from '@/components/page/data-viewer/interface/table.interface';

export const PokemonRegisterDetailTable: HeadersInterface[] = [
    {
        dataField: 'id',
        text: 'Código',
        show: '0',
    },
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
