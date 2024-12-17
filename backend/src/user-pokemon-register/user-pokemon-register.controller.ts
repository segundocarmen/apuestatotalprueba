import {
    Controller,
    Get,
    Post,
    Body,
    Headers,
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
import { CreateManyUserPokemonRegisterDto } from './dto/create-many-user-pokemon-register.dto';
import { UpdateUserPokemonRegisterDto } from './dto/update-user-pokemon-register.dto';
/**SERVICE**/
import { UserPokemonRegisterService } from './user-pokemon-register.service';

const entity = 'user-pokemon-register';

@ApiBearerAuth()
@ApiTags('UserPokemonRegister')
@UseGuards(JwtAuthGuard)
@Controller('user-pokemon-register')
export class UserPokemonRegisterController {
    constructor(
        private readonly defaultService: UserPokemonRegisterService,
        private readonly responseService: ResponseService
    ) {}

    @Post()
    @ApiOperation({ summary: `Create ${entity}` })
    async createMany(
        @Body()
        createManyUserPokemonRegisterDto: CreateManyUserPokemonRegisterDto,
        @Headers() head,
        @Res() res
    ) {
        const token = head.authorization.split(' ')[1];
        const data = await this.defaultService.createMany(
            createManyUserPokemonRegisterDto,
            token
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

    @Get('/pendings')
    @ApiOperation({ summary: `Get all ${entity}` })
    async findAllPendings(@Res() res) {
        const data = await this.defaultService.findAll(true);
        const response = await this.responseService.responseReturn({
            data,
            res
        });
        res.status(response.statusCode).send(response);
    }

    @Get('/by-user/:id')
    @ApiOperation({ summary: `Get all ${entity}` })
    async findAllByUser(@Param('id') id: string, @Res() res) {
        const data = await this.defaultService.findAllByUser(id);
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
        @Body() updateUserPokemonRegisterDto: UpdateUserPokemonRegisterDto,
        @Res() res
    ) {
        const data = await this.defaultService.update(
            id,
            updateUserPokemonRegisterDto
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
