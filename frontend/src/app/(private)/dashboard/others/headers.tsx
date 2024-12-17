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
        dataField: 'user.completeName',
        text: 'Usuario',
    },
    {
        dataField: 'accepted',
        text: 'Estado',
    },
];
