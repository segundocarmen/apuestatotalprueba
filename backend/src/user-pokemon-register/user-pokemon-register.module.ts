import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/**ADDONS**/
import { ResponseService } from '@addons/response/Response.service';
/**ENTITIES**/
import { UserPokemonRegister } from '@entities/user-pokemon-register.entity';
/**CONTROLLER**/
import { UserPokemonRegisterController } from './user-pokemon-register.controller';
/**SERVICE**/
import { UserPokemonRegisterService } from './user-pokemon-register.service';
import { User } from '@entities/user.entity';
import { UserService } from '@src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { EncoderService } from '@addons/auth/encoder.service';
import { UserRoleService } from '@src/user-role/user-role.service';
import { UserRole } from '@entities/user-role.entity';
import { UserPokemonRegisterDetail } from '@entities/user-pokemon-register-detail.entity';
import { UserPokemonRegisterDetailService } from '@src/user-pokemon-register-detail/user-pokemon-register-detail.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserPokemonRegister,
            UserPokemonRegisterDetail,
            User,
            UserRole
        ])
    ],
    controllers: [UserPokemonRegisterController],
    providers: [
        UserPokemonRegisterService,
        ResponseService,
        UserService,
        JwtService,
        EncoderService,
        UserRoleService,
        UserPokemonRegisterDetailService
    ]
})
export class UserRegisterPokemonModule {}
