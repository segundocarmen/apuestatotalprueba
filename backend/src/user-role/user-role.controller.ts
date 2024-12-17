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
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
/**SERVICE**/
import { UserRoleService } from './user-role.service';

const entity = 'user role';

@ApiBearerAuth()
@ApiTags('UserRole')
@UseGuards(JwtAuthGuard)
@Controller('user-role')
export class UserRoleController {
    constructor(
        private readonly defaultService: UserRoleService,
        private readonly responseService: ResponseService
    ) {}

    @Post()
    @ApiOperation({ summary: `Create ${entity}` })
    async create(@Body() createUserRoleDto: CreateUserRoleDto, @Res() res) {
        const data = await this.defaultService.create(createUserRoleDto);
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
        @Body() updateUserRoleDto: UpdateUserRoleDto,
        @Res() res
    ) {
        const data = await this.defaultService.update(id, updateUserRoleDto);
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
