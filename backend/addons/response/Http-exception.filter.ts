import { ArrayToString } from '@addons/utils';
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const messageInterceptor: any = exception.getResponse()['message'];
        const status = exception.getStatus();
        const message = ArrayToString(
            messageInterceptor.toString(),
            ',',
            ' | '
        );
        response.status(status).json({
            statusCode: status,
            codeDescription: HttpStatus[status],
            success: false,
            message,
            data: {
                timestamp: new Date().toISOString(),
                path: request.url
            }
        });
    }
}
