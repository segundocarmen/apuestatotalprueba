import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/**ADDONS**/
import { ResponseService } from '@addons/response/Response.service';
/**ENTITIES**/
import { UserPokemonRegisterDetail } from '@entities/user-pokemon-register-detail.entity';
/**CONTROLLER**/
import { UserPokemonRegisterDetailController } from './user-pokemon-register-detail.controller';
/**SERVICE**/
import { UserPokemonRegisterDetailService } from './user-pokemon-register-detail.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserPokemonRegisterDetail])],
    controllers: [UserPokemonRegisterDetailController],
    providers: [UserPokemonRegisterDetailService, ResponseService]
})
export class UserPokemonRegisterDetailModule {}
