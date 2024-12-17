export const ArrayToString = (string, search, replace) => {
    return string.split(search).join(replace);
};

export const PadNum = (num, size) => {
    num = num.toString();
    while (num.length < size) num = '0' + num;
    return num;
};
