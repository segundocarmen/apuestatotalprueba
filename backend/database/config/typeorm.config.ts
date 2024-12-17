import { ConfigModule, ConfigService } from '@nestjs/config';
import {
    TypeOrmModuleAsyncOptions,
    TypeOrmModuleOptions
} from '@nestjs/typeorm';
import { AccessLogDetail } from '../entities/access-log-detail.entity';
import { AccessLog } from '../entities/access-log.entity';
import { UserRole } from '../entities/user-role.entity';
import { User } from '../entities/user.entity';
import { UserPokemonRegister } from '../entities/user-pokemon-register.entity';
import { MedalSequence } from '../entities/medal-sequence.entity';
import { AppSection } from '../entities/app-section.entity';
import { UserPokemonRegisterDetail } from '../entities/user-pokemon-register-detail.entity';

// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
require('dotenv').config();
const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (): Promise<TypeOrmModuleOptions | any> => {
        return {
            migrationsTableName: 'migrations',
            type: 'mysql',
            host: DB_HOST,
            port: parseInt(DB_PORT, 10),
            username: DB_USERNAME,
            database: DB_NAME,
            password: DB_PASSWORD,
            entities: [
                AccessLogDetail,
                AccessLog,
                UserRole,
                AppSection,
                User,
                UserPokemonRegister,
                UserPokemonRegisterDetail,
                MedalSequence
            ],
            seeds: [__dirname + '/../seeders/**/*{.ts,.js}'],
            extra: {
                charset: 'utf8mb4_unicode_ci'
            },
            synchronize: true,
            logging: false
        };
    }
};

export const typeOrmConfig: any = {
    type: 'mysql',
    host: DB_HOST,
    port: parseInt(DB_PORT, 10),
    username: DB_USERNAME,
    database: DB_NAME,
    password: DB_PASSWORD,
    entities: [
        AccessLogDetail,
        AccessLog,
        UserRole,
        AppSection,
        User,
        UserPokemonRegister,
        UserPokemonRegisterDetail,
        MedalSequence
    ],
    seeds: [__dirname + '/../seeders/**/*{.ts,.js}'],
    extra: {
        charset: 'utf8mb4_unicode_ci'
    },
    logging: false
};
