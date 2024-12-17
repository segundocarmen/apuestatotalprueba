const state = [
    {
        value: 0,
        label: 'Inactive'
    },
    {
        value: 1,
        label: 'Active'
    }
];

//  eslint-disable-next-line @typescript-eslint/no-namespace
namespace Functions {
    export const DateToString = (date:string, ymd = false) => {
        const d = new Date(date);
        let month = `${d.getMonth() + 1}`;
        let day = `${d.getDate()}`;
        const year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        if (ymd) {
            return [year, month, day].join('/');
        } else {
            return [day, month, year].join('/');
        }
    };

    export const ShortString = (string:string, long = 40) => {
        if (string === undefined) {
            return '';
        } else {
            if (string.length > long) {
                return string.substring(0, long).concat('...');
            } else {
                return string;
            }
        }
    };

    export const ArrayLenght = (array = []) => {
        return array.length;
    };

    export const GetStatus = (value:number) => {
        const status = state.find(item => item.value === value);
        return status?.label;
    };
}

type funcs = typeof Functions[keyof typeof Functions];


export interface HeadersInterface {
    dataField: string;
    text: string;
    show?: '0' | '1';
    renderFunction?: funcs;
    addclass?: boolean;
}

interface ActionButtonsInterface {
    onEdit?: (id: string, type: number) => void;
    onDelete?: (id: string, type: number) => void;
    onDetails?: (id: string, type: number) => void;
}

interface AddsActionsInterface {
    action?: (id: string) => void;
    title?: string;
    iconUrl?: string;
}

export interface TableInterface {
    headers: HeadersInterface[];
    data: object[];
    showPagination?: boolean;
    actionsButtons?: ActionButtonsInterface;
    addsActions?: AddsActionsInterface[];
    tableSize?: number;
}

export const TypeActionButton = {
    edit: 0,
    delete: 1,
    details: 2
}