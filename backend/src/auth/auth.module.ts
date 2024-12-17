import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
/**ADDONS**/
import { EncoderService } from '@addons/auth/encoder.service';
import { ResponseService } from '@addons/response/Response.service';
import { JswStrategyService } from '@addons/auth/jwt-stategy';
/**ENTITIES**/
import { User } from '@entities/user.entity';
import { UserRole } from '@entities/user-role.entity';
/**SRC**/
import { UserService } from '@src/user/user.service';
import { UserRoleService } from '@src/user-role/user-role.service';
/**CONTROLLER**/
import { AuthController } from './auth.controller';
/**SERVICE**/
import { AuthService } from './auth.service';
import { AccessLog } from '@entities/access-log.entity';
import { AccessLogDetail } from '@entities/access-log-detail.entity';
import { AccessLogService } from '@src/access-log/access-log.service';
import { AccessLogDetailService } from '@src/access-log/access-log-detail.service';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: '30d'
            }
        }),
        TypeOrmModule.forFeature([User, UserRole, AccessLog, AccessLogDetail])
    ],
    controllers: [AuthController],
    providers: [
        ResponseService,
        EncoderService,
        UserService,
        AuthService,
        JswStrategyService,
        UserRoleService,
        AccessLogService,
        AccessLogDetailService
    ],
    exports: [JswStrategyService, PassportModule]
})
export class AuthModule {}
