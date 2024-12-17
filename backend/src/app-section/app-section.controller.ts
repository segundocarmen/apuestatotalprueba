import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
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
import { CreateAppSectionDto } from './dto/create-app-section.dto';
import { UpdateAppSectionDto } from './dto/update-app-section.dto';
/**SERVICE**/
import { AppSectionService } from './app-section.service';

const entity = 'app section';

@ApiBearerAuth()
@ApiTags('AppSection')
@UseGuards(JwtAuthGuard)
@Controller('app-section')
export class AppSectionController {
    constructor(
        private readonly defaultService: AppSectionService,
        private readonly responseService: ResponseService
    ) {}

    @Post()
    @ApiOperation({ summary: `Create ${entity}` })
    async create(@Body() createAppSectionDto: CreateAppSectionDto, @Res() res) {
        const data = await this.defaultService.create(createAppSectionDto);
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
        @Body() updateAppSectionDto: UpdateAppSectionDto,
        @Res() res
    ) {
        const data = await this.defaultService.update(id, updateAppSectionDto);
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
