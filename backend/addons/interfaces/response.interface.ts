export interface ResponseInterface {
    statusCode: number;
    codeDescription?: string;
    success?: boolean;
    message?: string;
    data: any;
}
