/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiRequest {
    method?: string;
    path: string;
    token?: string;
    data?: any;
    dataHeaders?: any;
}
