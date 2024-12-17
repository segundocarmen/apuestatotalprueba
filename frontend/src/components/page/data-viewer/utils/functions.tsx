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

export const DateToString = (date:string, ymd = false) => {
    if (date.length === 6) {
        const year = date.substring(0, 4);
        const month = date.substring(4, 6);
        if (ymd) {
            return [year, month].join('/');
        } else {
            return [month, year].join('/');
        }
    } else {
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
