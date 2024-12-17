import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
/**ENTITIES**/
import { AccessLogDetail } from '@entities/access-log-detail.entity';
/**DTO**/
import { CreateAccessLogDetailDto } from './dto/create-access-log-detail.dto';

@Injectable()
export class AccessLogDetailService {
    constructor(
        @InjectRepository(AccessLogDetail)
        private entityRepository: Repository<AccessLogDetail>
    ) {}

    async saveLogDetail(
        createAccessLogDetailDto: CreateAccessLogDetailDto[]
    ): Promise<AccessLogDetail[] | null> {
        try {
            const created = this.entityRepository.create(
                createAccessLogDetailDto
            );
            const data = await this.entityRepository.save(created);
            return data;
        } catch (error) {
            return null;
        }
    }
}
