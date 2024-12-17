/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiResponseInterface {
    statusCode: number;
    codeDescription: string;
    success: boolean;
    message: string;
    data: any;
}
