import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/**ADDONS**/
import { ResponseService } from '@addons/response/Response.service';
/**CONTROLLER**/
import { AccessLogController } from './access-log.controller';
import { AccessLogService } from './access-log.service';
import { AccessLogDetailService } from './access-log-detail.service';
import { AccessLog } from '@entities/access-log.entity';
import { AccessLogDetail } from '@entities/access-log-detail.entity';
/**SERVICE**/
@Module({
    imports: [TypeOrmModule.forFeature([AccessLog, AccessLogDetail])],
    controllers: [AccessLogController],
    providers: [AccessLogService, ResponseService, AccessLogDetailService]
})
export class AccessLogModule {}
