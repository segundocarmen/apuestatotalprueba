
export interface RoleInterface {
    id: string;
    name: string;
    initialSection: string;
    state: number;
    createdAt: string;
    updatedAt: string;
}

export interface RoleFormCreateInterface {
    name: string;
    initialSection: string;
    value: number;
}

export const RoleFormValues: RoleFormCreateInterface = {
    name: '',
    initialSection: '',
    value: 0
};
