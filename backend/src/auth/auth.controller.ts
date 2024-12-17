import { Controller, Post, Body, Headers, Res, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
/**ADDONS**/
import { ResponseService } from '@addons/response/Response.service';
/**DTO**/
import { AuthDto } from './dto/auth.dto';
/**SERVICE**/
import { AuthService } from './auth.service';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly defaultService: AuthService,
        private readonly responseService: ResponseService
    ) {}

    @Post('login')
    @ApiOperation({ summary: 'Login in the application' })
    async login(@Body() authDto: AuthDto, @Res() res) {
        const data = await this.defaultService.login(authDto);
        const response = await this.responseService.responseReturn({
            data,
            res
        });
        res.status(response.statusCode).send(response);
    }

    @Post('login-shop')
    @ApiOperation({ summary: 'Login in the application' })
    async loginShop(@Body() authDto: AuthDto, @Res() res) {
        const data = await this.defaultService.loginShop(authDto);
        const response = await this.responseService.responseReturn({
            data,
            res
        });
        res.status(response.statusCode).send(response);
    }

    @Get('/validate')
    @ApiOperation({ summary: 'Verify if token is valid' })
    async validate(@Headers() head, @Res() res) {
        const { authorization } = head;
        const token = authorization.split(' ')[1];
        const data = await this.defaultService.validate({ token });
        const response = await this.responseService.responseReturn({
            data,
            res
        });
        res.status(response.statusCode).send(response);
    }

    @Get('/refresh-token')
    @ApiOperation({ summary: 'Verify if token is valid' })
    async refreshToken(@Headers() head, @Res() res) {
        const { authorization } = head;
        const token = authorization.split(' ')[1];
        const data = await this.defaultService.validate({ token });
        const response = await this.responseService.responseReturn({
            data,
            res
        });
        res.status(response.statusCode).send(response);
    }
}
