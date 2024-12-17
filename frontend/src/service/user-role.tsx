export const ApiUserRole = `${process.env.NEXT_PUBLIC_SERVICE}/user-role`;
export const ApiUserRoleId = (id: string) =>
    `${process.env.NEXT_PUBLIC_SERVICE}/user-role/${id}`;
