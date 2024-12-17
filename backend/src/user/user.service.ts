import { Injectable, HttpStatus } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 } from 'uuid';
/**ADDONS**/
import { EncoderService } from '@addons/auth/encoder.service';
import { ResponseInterface } from '@addons/interfaces/response.interface';
/**ENTITIES**/
import { User } from '@entities/user.entity';
/**ENUMS**/
import { StateCollection } from '@enums/StateCollection';
/**SRC**/
/**DTO**/
import { UpdateUserDto } from './dto/update-user.dto';
/**SERVICE**/
import { JwtService } from '@nestjs/jwt';
import { ResponseDictionary } from '@addons/response/ResponseDictionary';
import { UserRoleService } from '@src/user-role/user-role.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private entityRepository: Repository<User>,
        private jwtService: JwtService,
        private encoderService: EncoderService,
        private userRoleService: UserRoleService
    ) {}

    async create(
        createUserDto: any,
        exist = false,
        isShop = false
    ): Promise<ResponseInterface> {
        try {
            let data;
            let isShopRoleId;
            if (isShop) {
                const { data: defaultUserShop } =
                    await this.userRoleService.findOneByName('ClasicUser');
                isShopRoleId = defaultUserShop.id;
            }
            if (!exist) {
                const password = await this.encoderService.encodePassword(
                    createUserDto.password
                );
                const activationToken = v4();
                let entity = Object.assign(createUserDto, {
                    password,
                    activationToken,
                    state: StateCollection.ACTIVE
                });
                if (isShop) {
                    entity = Object.assign(entity, {
                        role: isShopRoleId
                    });
                }
                const created = this.entityRepository.create(entity);
                data = await this.entityRepository.save(created);
            }
            return {
                statusCode: HttpStatus.CREATED,
                data,
                message: ResponseDictionary.createdRegister
            };
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                data: error,
                message: error.message
            };
        }
    }

    async findAll(): Promise<ResponseInterface> {
        try {
            const data = await this.entityRepository.find({
                relations: [],
                where: { state: StateCollection.ACTIVE }
            });
            return { statusCode: HttpStatus.OK, data };
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                data: error,
                message: error.message
            };
        }
    }

    async addRefreshToken(): Promise<ResponseInterface> {
        try {
            const users = await this.entityRepository.find({
                where: { state: StateCollection.ACTIVE }
            });
            const data = [];
            await Promise.all(
                users.map(async entity => {
                    const objUserPayload = {
                        id: entity.id,
                        email: entity.email,
                        name: entity.email
                    };
                    // const token = this.jwtService.sign(objUserPayload);
                    const refreshToken = this.jwtService.sign(objUserPayload, {
                        secret: process.env.JWT_REFRESH_SECRET,
                        expiresIn: '30d'
                    });
                    // const refreshToken = v4();
                    entity = Object.assign(entity, { refreshToken });
                    const res = await this.entityRepository.save(entity);
                    data.push(res);
                })
            );
            return { statusCode: HttpStatus.OK, data };
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                data: error,
                message: error.message
            };
        }
    }

    async findOne(id: string): Promise<ResponseInterface> {
        try {
            const data = await this.entityRepository.findOne({
                where: { id, state: StateCollection.ACTIVE },
                relations: []
            });
            return { statusCode: HttpStatus.OK, data };
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                data: error,
                message: error.message
            };
        }
    }

    async findOneByEmail(email: string): Promise<ResponseInterface> {
        try {
            const data = await this.entityRepository.findOne({
                where: { email, state: StateCollection.ACTIVE },
                relations: ['role', 'role.appSections']
            });
            return { statusCode: HttpStatus.OK, data };
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                data: error,
                message: error.message
            };
        }
    }

    async findOneByEmailShop(email: string): Promise<ResponseInterface> {
        try {
            const data = await this.entityRepository.findOne({
                where: {
                    email,
                    state: StateCollection.ACTIVE,
                    role: {
                        name: Like(`%ClasicUser%`)
                    }
                },
                relations: []
            });
            return { statusCode: HttpStatus.OK, data };
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                data: error,
                message: error.message
            };
        }
    }

    async findOneByAuth(
        email: string,
        isOauth = false,
        filters: any,
        role: string
    ): Promise<ResponseInterface> {
        try {
            const data = await this.entityRepository.findOne({
                where: {
                    email,
                    isOauth,
                    ...filters,
                    role: Like(`%${role}%`),
                    state: StateCollection.ACTIVE
                }
            });
            return { statusCode: HttpStatus.OK, data };
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                data: error,
                message: error.message
            };
        }
    }

    async update(
        id: string,
        updateUserDto: UpdateUserDto
    ): Promise<ResponseInterface> {
        try {
            let entity = await this.entityRepository.findOne({ where: { id } });
            entity = Object.assign(entity, updateUserDto);
            const data = await this.entityRepository.save(entity);
            return {
                statusCode: HttpStatus.OK,
                data,
                message: ResponseDictionary.registerUpdate
            };
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                data: error,
                message: error.message
            };
        }
    }

    async remove(id: string): Promise<ResponseInterface> {
        try {
            let entity = await this.entityRepository.findOne({ where: { id } });
            entity = Object.assign(entity, { state: StateCollection.INACTIVE });
            const data = await this.entityRepository.save(entity);
            return {
                statusCode: HttpStatus.OK,
                data,
                message: ResponseDictionary.registerDelete
            };
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                data: error,
                message: `${error.message} - ${ResponseDictionary.registerNotDelete}`
            };
        }
    }
}
