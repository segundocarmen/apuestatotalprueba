export const ApiUsers = `${process.env.NEXT_PUBLIC_SERVICE}/user`;
export const ApiUsersShop = `${process.env.NEXT_PUBLIC_SERVICE}/user/user-shop`;
export const ApiUsersId = (id: string) =>
    `${process.env.NEXT_PUBLIC_SERVICE}/user/${id}`;
