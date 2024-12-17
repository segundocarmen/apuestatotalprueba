import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { typeOrmConfigAsync } from 'database/config/typeorm.config';
import { JwtService } from '@nestjs/jwt';
import { AccessLogModule } from './access-log/access-log.module';
import { UserModule } from './user/user.module';
import { UserRoleModule } from './user-role/user-role.module';
import { AuthModule } from './auth/auth.module';
import { UserRegisterPokemonModule } from './user-pokemon-register/user-pokemon-register.module';
import { MedalSequenceModule } from './medal-sequence/medal-sequence.module';
import { AppSectionModule } from './app-section/app-section.module';
import { UserPokemonRegisterDetailModule } from './user-pokemon-register-detail/user-pokemon-register-detail.module';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        ConfigModule.forRoot({
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync(typeOrmConfigAsync),
        AccessLogModule,
        AuthModule,
        UserModule,
        AppSectionModule,
        UserRoleModule,
        UserRegisterPokemonModule,
        UserPokemonRegisterDetailModule,
        MedalSequenceModule
    ],
    providers: [JwtService]
})
export class AppModule {}
