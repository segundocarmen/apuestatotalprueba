import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/**ADDONS**/
import { ResponseService } from '@addons/response/Response.service';
/**ENTITIES**/
import { MedalSequence } from '@entities/medal-sequence.entity';
/**CONTROLLER**/
import { MedalSequenceController } from './medal-sequence.controller';
/**SERVICE**/
import { MedalSequenceService } from './medal-sequence.service';
import { JwtService } from '@nestjs/jwt';
import { UserPokemonRegister } from '@entities/user-pokemon-register.entity';
import { UserPokemonRegisterService } from '@src/user-pokemon-register/user-pokemon-register.service';
import { UserPokemonRegisterDetail } from '@entities/user-pokemon-register-detail.entity';
import { UserPokemonRegisterDetailService } from '@src/user-pokemon-register-detail/user-pokemon-register-detail.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            MedalSequence,
            UserPokemonRegister,
            UserPokemonRegisterDetail
        ])
    ],
    controllers: [MedalSequenceController],
    providers: [
        MedalSequenceService,
        ResponseService,
        JwtService,
        UserPokemonRegisterService,
        UserPokemonRegisterDetailService
    ]
})
export class MedalSequenceModule {}
