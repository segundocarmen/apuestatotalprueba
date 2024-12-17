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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
/**SERVICE**/
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(
        private readonly defaultService: UserService,
        private readonly responseService: ResponseService
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create user' })
    async create(@Body() createUserDto: CreateUserDto, @Res() res) {
        const data = await this.defaultService.create(createUserDto);
        const response = await this.responseService.responseReturn({
            data,
            res
        });
        res.status(response.statusCode).send(response);
    }

    @Post('user-shop')
    @ApiOperation({ summary: 'Create user' })
    async createShop(@Body() createUserDto: CreateUserDto, @Res() res) {
        const data = await this.defaultService.create(
            createUserDto,
            false,
            true
        );
        const response = await this.responseService.responseReturn({
            data,
            res
        });
        res.status(response.statusCode).send(response);
    }

    @Get('/add-refresh-token')
    @ApiOperation({ summary: 'Activate account' })
    async addRefreshToken(@Res() res) {
        const data = await this.defaultService.addRefreshToken();
        const response = await this.responseService.responseReturn({
            data,
            res
        });
        res.status(response.statusCode).send(response);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOperation({ summary: 'Get all users' })
    async findAll(@Res() res) {
        const data = await this.defaultService.findAll();
        const response = await this.responseService.responseReturn({
            data,
            res
        });
        res.status(response.statusCode).send(response);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiOperation({ summary: 'Get specific user' })
    async findOne(@Param('id') id: string, @Res() res) {
        const data = await this.defaultService.findOne(id);
        const response = await this.responseService.responseReturn({
            data,
            res
        });
        res.status(response.statusCode).send(response);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    @ApiOperation({ summary: 'Update user' })
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
        @Res() res
    ) {
        const data = await this.defaultService.update(id, updateUserDto);
        const response = await this.responseService.responseReturn({
            data,
            res
        });
        res.status(response.statusCode).send(response);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Delete user' })
    async remove(@Param('id') id: string, @Res() res) {
        const data = await this.defaultService.remove(id);
        const response = await this.responseService.responseReturn({
            data,
            res
        });
        res.status(response.statusCode).send(response);
    }
}
