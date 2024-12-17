import { Injectable, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
/**ADDONS**/
import { ResponseInterface } from '@addons/interfaces/response.interface';
/**ENTITIES**/
import { AccessLog } from '@entities/access-log.entity';
/**DTO**/
import { CreateAccessLogDetailDto } from './dto/create-access-log-detail.dto';
import { AccessLogDetailService } from './access-log-detail.service';
import { CreateAccessLogDto } from './dto/create-access-log.dto';

@Injectable()
export class AccessLogService {
    constructor(
        @InjectRepository(AccessLog)
        private entityRepository: Repository<AccessLog>,
        private accessLogDetailService: AccessLogDetailService
    ) {}

    async saveLog(
        createAccessLogDto: CreateAccessLogDto
    ): Promise<ResponseInterface> {
        try {
            const created = this.entityRepository.create(createAccessLogDto);
            const data = await this.entityRepository.save(created);
            return { statusCode: HttpStatus.OK, data };
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                data: error,
                message: error.message
            };
        }
    }

    async getLogByToken(token: string): Promise<AccessLog | null> {
        const log: AccessLog = await this.entityRepository.findOne({
            where: { token }
        });
        if (!log) return null;
        return log;
    }

    async saveLogDetail(
        createAccessLogDetailDto: CreateAccessLogDetailDto[],
        token: string
    ): Promise<ResponseInterface> {
        try {
            const log = await this.getLogByToken(token);
            const newDto: CreateAccessLogDetailDto[] = [];
            for (const element of createAccessLogDetailDto) {
                const newObject: CreateAccessLogDetailDto = Object.assign(
                    element,
                    { ...element, accessLog: log }
                );
                newDto.push(newObject);
            }
            const data = await this.accessLogDetailService.saveLogDetail(
                newDto
            );
            return { statusCode: HttpStatus.OK, data };
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                data: error,
                message: error.message
            };
        }
    }
}
