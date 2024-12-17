import { HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
/**ADDONS**/
import { ResponseInterface } from '@addons/interfaces/response.interface';
import { CONSTANTS } from '@addons/Constants';
import { ResponseDictionary } from '@addons/response/ResponseDictionary';
/**SRC**/
/**DTO**/
import { AuthDto } from './dto/auth.dto';
import { ValidateDto } from './dto/validate.dto';
/**INTERFACE**/
/**SERVICES**/
import { AccessLogService } from '@src/access-log/access-log.service';
import { JwtPayloadInterface } from './interfaces/jwt-payload.interface';
import { UserService } from '@src/user/user.service';
import { UserRoleService } from '@src/user-role/user-role.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
        private accessLogService: AccessLogService,
        private userRoleService: UserRoleService
    ) {}

    async login(authDto: AuthDto): Promise<ResponseInterface> {
        try {
            const { email, password } = authDto;
            const { data } = await this.userService.findOneByEmail(email);
            const user = data;
            if (!user) {
                return {
                    statusCode: HttpStatus.NOT_FOUND,
                    data: {},
                    message: ResponseDictionary.userNotRegistered
                };
            }
            const checkPassword = await bcrypt.compare(password, user.password);
            if (!checkPassword) {
                return {
                    statusCode: HttpStatus.UNAUTHORIZED,
                    data: {},
                    message: ResponseDictionary.passwordNotMatch
                };
            }

            const payload = await this.GeneratePayloadUser(user);
            const token = this.jwtService.sign(payload);
            const localTime = new Date().toLocaleString(
                CONSTANTS.generalTimeZoneCode,
                {
                    timeZone: CONSTANTS.generalTimeZone
                }
            );
            await this.accessLogService.saveLog({ user, token, localTime });
            delete user.password;
            const userData = { ...user };

            return {
                statusCode: HttpStatus.OK,
                data: { token, userData },
                message: ResponseDictionary.loginSuccessfull
            };
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                data: { error },
                message: error.message
            };
        }
    }

    async loginShop(authDto: AuthDto): Promise<ResponseInterface> {
        try {
            const { data: defaultUserShop } =
                await this.userRoleService.findOneByName('Buyer');
            const { email, password, oauth, registerData } = authDto;
            const isRegisterShop =
                await this.userService.findOneByEmailShop(email);
            if (!isRegisterShop.data) {
                await this.userService.create(registerData, false, true);
            }
            let user;
            if (!oauth) {
                const { data } =
                    await this.userService.findOneByEmailShop(email);
                user = data;
            } else {
                const filters = {
                    isGoogle: oauth.isGoogle,
                    isMs: oauth.isMs,
                    oauthId: oauth.oauthId
                };
                const res = await this.userService.findOneByAuth(
                    email,
                    true,
                    filters,
                    defaultUserShop.id
                );
                user = res.data;
            }
            if (!user) {
                return {
                    statusCode: HttpStatus.NOT_FOUND,
                    data: {},
                    message: ResponseDictionary.userNotRegistered
                };
            }
            if (!oauth) {
                const checkPassword = await bcrypt.compare(
                    password,
                    user.password
                );
                if (!checkPassword) {
                    return {
                        statusCode: HttpStatus.UNAUTHORIZED,
                        data: {},
                        message: ResponseDictionary.passwordNotMatch
                    };
                }
            }

            const payload = await this.GeneratePayloadUser(user);
            const token = this.jwtService.sign(payload);
            const localTime = new Date().toLocaleString(
                CONSTANTS.generalTimeZoneCode,
                {
                    timeZone: CONSTANTS.generalTimeZone
                }
            );
            await this.accessLogService.saveLog({ user, token, localTime });
            delete user.password;
            const userData = { ...user };

            return {
                statusCode: HttpStatus.OK,
                data: { token, userData },
                message: ResponseDictionary.loginSuccessfull
            };
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                data: { error },
                message: error.message
            };
        }
    }

    private GeneratePayloadUser = (user: any) => {
        const payload: JwtPayloadInterface = {
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            state: user.state,
            refreshToken: user.refreshToken,
            isOauth: user.isOauth,
            isGoogle: user.isGoogle,
            isMs: user.isMs,
            oauthId: user.oauthId
        };
        return payload;
    };

    async validate(validateDto: ValidateDto): Promise<ResponseInterface> {
        try {
            const { token } = validateDto;
            await this.jwtService.verify(token);
            return { statusCode: HttpStatus.OK, data: { token } };
        } catch (error) {
            if (error.message === 'jwt expired') {
                const decoded: any = this.jwtService.decode(validateDto.token);
                const refreshTokenString = decoded.refreshToken;
                const {
                    data: { token },
                    success: status
                } = await this.refreshToken(refreshTokenString);
                if (status) {
                    return {
                        statusCode: HttpStatus.ACCEPTED,
                        data: { token }
                    };
                } else {
                    return { statusCode: HttpStatus.UNAUTHORIZED, data: error };
                }
            } else {
                return {
                    statusCode: HttpStatus.UNAUTHORIZED,
                    data: error,
                    message: error.message
                };
            }
        }
    }

    async refreshToken(refreshToken: string): Promise<ResponseInterface> {
        try {
            await this.jwtService.verify(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET
            });
            const decoded: any = this.jwtService.decode(refreshToken);
            const email = decoded.email;
            const user = await this.userService.findOneByEmail(email);
            const payload = await this.GeneratePayloadUser(user);
            const token = this.jwtService.sign(payload);

            // const { data: clientData } =
            //     await this.clientUserService.findAllByUser(user.id);
            // delete user.password;
            // const userData = { ...user, clientData };
            return {
                statusCode: HttpStatus.ACCEPTED,
                data: { token },
                success: true
            };
        } catch (error) {
            return {
                statusCode: HttpStatus.UNAUTHORIZED,
                data: error,
                message: error.message
            };
        }
    }
}
