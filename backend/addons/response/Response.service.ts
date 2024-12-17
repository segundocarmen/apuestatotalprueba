import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseInterface } from '../interfaces/response.interface';
import { ParamsResponseInterface } from '../interfaces/params.response.interface';
import { CODE_RESPONSE } from './CodeResponse';
@Injectable()
export class ResponseService {
    async responseReturn(
        paramsResponseInterface: ParamsResponseInterface
    ): Promise<any> {
        try {
            const { data } = paramsResponseInterface;
            const dataReceived: ResponseInterface = data;
            for (const item of CODE_RESPONSE) {
                if (item.CODE === dataReceived.statusCode) {
                    return {
                        statusCode: item.CODE,
                        codeDescription: HttpStatus[item.CODE],
                        success: item.STATUS,
                        message: data.message ? data.message : item.MESSAGE,
                        data: dataReceived.data
                    };
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    responseService(params: ResponseInterface) {
        return {
            statusCode: params.statusCode,
            codeDescription: params.codeDescription,
            data: params.data,
            success: params.success,
            message: params.message
        };
    }
}
