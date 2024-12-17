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
import { CreateUserPokemonRegisterDetailDto } from './dto/create-user-pokemon-register-detail.dto';
import { UpdateUserPokemonRegisterDetailDto } from './dto/update-user-pokemon-register-detail.dto';
/**SERVICE**/
import { UserPokemonRegisterDetailService } from './user-pokemon-register-detail.service';

const entity = 'user pokemon register detail';

@ApiBearerAuth()
@ApiTags('UserPokemonRegisterDetail')
@UseGuards(JwtAuthGuard)
@Controller('user-pokemon-register-detail')
export class UserPokemonRegisterDetailController {
    constructor(
        private readonly defaultService: UserPokemonRegisterDetailService,
        private readonly responseService: ResponseService
    ) {}

    @Post()
    @ApiOperation({ summary: `Create ${entity}` })
    async create(
        @Body()
        createUserPokemonRegisterDetailDto: CreateUserPokemonRegisterDetailDto,
        @Res() res
    ) {
        const data = await this.defaultService.create(
            createUserPokemonRegisterDetailDto
        );
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

    @Get('by-register/:id')
    @ApiOperation({ summary: `Get all ${entity}` })
    async findAllByRegister(@Param('id') id: string, @Res() res) {
        const data = await this.defaultService.findAllByRegister(id);
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
        @Body()
        updateUserPokemonRegisterDetailDto: UpdateUserPokemonRegisterDetailDto,
        @Res() res
    ) {
        const data = await this.defaultService.update(
            id,
            updateUserPokemonRegisterDetailDto
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
