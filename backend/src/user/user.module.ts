import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/**ADDONS**/
import { EncoderService } from '@addons/auth/encoder.service';
import { ResponseService } from '@addons/response/Response.service';
/**ENTITIES**/
import { User } from '@entities/user.entity';
import { UserRole } from '@entities/user-role.entity';
/**SRC**/
import { UserRoleService } from '@src/user-role/user-role.service';
/**SERVICE**/
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([User, UserRole])],
    controllers: [UserController],
    providers: [
        EncoderService,
        ResponseService,
        UserService,
        UserRoleService,
        JwtService
    ],
    exports: [UserService]
})
export class UserModule {}
