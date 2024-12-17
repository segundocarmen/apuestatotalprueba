import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Headers,
    Param,
    Delete,
    Res,
    UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
/**ADDONS**/
import { ResponseService } from '@addons/response/Response.service';
import { JwtAuthGuard } from '@addons/auth/jwt-auth.guard';
/**DTO**/
import { CreateMedalSequenceDto } from './dto/create-medal-sequence.dto';
import { UpdateMedalSequenceDto } from './dto/update-medal-sequence.dto';
/**SERVICE**/
import { MedalSequenceService } from './medal-sequence.service';

const entity = 'medal sequence';

@ApiBearerAuth()
@ApiTags('MedalSequence')
@UseGuards(JwtAuthGuard)
@Controller('medal-sequence')
export class MedalSequenceController {
    constructor(
        private readonly defaultService: MedalSequenceService,
        private readonly responseService: ResponseService
    ) {}

    @Post()
    @ApiOperation({ summary: `Create ${entity}` })
    async create(
        @Body() createMedalSequenceDto: CreateMedalSequenceDto,
        @Res() res
    ) {
        const data = await this.defaultService.create(createMedalSequenceDto);
        const response = await this.responseService.responseReturn({
            data,
            res
        });
        res.status(response.statusCode).send(response);
    }

    @Get()
    @ApiOperation({ summary: `Get all ${entity}` })
    async findAll(@Res() res) {
        const data = await this.defaultService.findAll();
        const response = await this.responseService.responseReturn({
            data,
            res
        });
        res.status(response.statusCode).send(response);
    }

    @Post('validate-medal-user')
    @ApiOperation({ summary: `Create ${entity}` })
    async validateMedals(@Res() res, @Headers() head) {
        const token = head.authorization.split(' ')[1];
        const data = await this.defaultService.validateMedals(token);
        const response = await this.responseService.responseReturn({
            data,
            res
        });
        res.status(response.statusCode).send(response);
    }

    @Get(':id')
    @ApiOperation({ summary: `Get specific ${entity}` })
    async findOne(@Param('id') id: string, @Res() res) {
        const data = await this.defaultService.findOne(id);
        const response = await this.responseService.responseReturn({
            data,
            res
        });
        res.status(response.statusCode).send(response);
    }

    @Patch(':id')
    @ApiOperation({ summary: `Update ${entity}` })
    async update(
        @Param('id') id: string,
        @Body() updateMedalSequenceDto: UpdateMedalSequenceDto,
        @Res() res
    ) {
        const data = await this.defaultService.update(
            id,
            updateMedalSequenceDto
        );
        const response = await this.responseService.responseReturn({
            data,
            res
        });
        res.status(response.statusCode).send(response);
    }

    @Delete(':id')
    @ApiOperation({ summary: `Delete ${entity}` })
    async remove(@Param('id') id: string, @Res() res) {
        const data = await this.defaultService.remove(id);
        const response = await this.responseService.responseReturn({
            data,
            res
        });
        res.status(response.statusCode).send(response);
    }
}
