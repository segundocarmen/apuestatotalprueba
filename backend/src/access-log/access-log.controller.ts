import {
    Controller,
    Post,
    Body,
    Headers,
    Res,
    UseGuards,
    Put
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
/**ADDONS**/
import { ResponseService } from '@addons/response/Response.service';
/**SERVICE**/
import { AccessLogService } from './access-log.service';

import { JwtAuthGuard } from '@addons/auth/jwt-auth.guard';
import { CreateAccessLogDetailDto } from './dto/create-access-log-detail.dto';
import { CreateAccessLogDto } from './dto/create-access-log.dto';

const entity = 'access log';

@ApiBearerAuth()
@ApiTags('AccessLog')
@UseGuards(JwtAuthGuard)
@Controller('access-log')
export class AccessLogController {
    constructor(
        private readonly defaultService: AccessLogService,
        private readonly responseService: ResponseService
    ) {}

    @Post()
    @ApiOperation({ summary: `Create ${entity}` })
    async saveLog(@Body() createAccessLogDto: CreateAccessLogDto, @Res() res) {
        const data = await this.defaultService.saveLog(createAccessLogDto);
        const response = await this.responseService.responseReturn({
            data,
            res
        });
        res.status(response.statusCode).send(response);
    }

    @Put('/details')
    @ApiOperation({ summary: `Create ${entity} details` })
    async saveDetail(
        @Body() createAccessLogDetailDto: CreateAccessLogDetailDto[],
        @Headers() head,
        @Res() res
    ) {
        const token = head.authorization.split(' ')[1];
        const data = await this.defaultService.saveLogDetail(
            createAccessLogDetailDto,
            token
        );
        const response = await this.responseService.responseReturn({
            data,
            res
        });
        res.status(response.statusCode).send(response);
    }
}
