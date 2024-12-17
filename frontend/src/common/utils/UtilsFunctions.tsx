export const ToPascalCase = (text: string) => {
    return `${text}`
        .toLowerCase()
        .replace(new RegExp(/[-_]+/, 'g'), ' ')
        .replace(new RegExp(/[^\w\s]/, 'g'), '')
        .replace(
            new RegExp(/\s+(.)(\w*)/, 'g'),
            ($1, $2, $3) => `${$2.toUpperCase() + $3}`
        )
        .replace(new RegExp(/\w/), s => s.toUpperCase());
};

export const  PadNum = (num:number, size: number) => {
    let number = num.toString();
    while (number.length < size) number = "0" + num;
    return number;
}

export const NumberDecimaZero = (number:number) => {
    const total = (Math.round(number * 100) / 100).toFixed(2);
    return total;
}

