import { Injectable, HttpStatus } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
/**ADDONS**/
import { ResponseInterface } from '@addons/interfaces/response.interface';
/**ENTITIES**/
import { UserPokemonRegister } from '@entities/user-pokemon-register.entity';
/**ENUMS**/
import { StateCollection } from '@enums/StateCollection';
/**DTO**/
import { CreateUserPokemonRegisterDto } from './dto/create-user-pokemon-register.dto';
import { CreateManyUserPokemonRegisterDto } from './dto/create-many-user-pokemon-register.dto';
import { UpdateUserPokemonRegisterDto } from './dto/update-user-pokemon-register.dto';
import { ResponseDictionary } from '@addons/response/ResponseDictionary';
import { RegisterStateCollection } from '@enums/register.state.Collection';
import { UserPokemonRegisterDetailService } from '@src/user-pokemon-register-detail/user-pokemon-register-detail.service';
/**INTERFACE**/

@Injectable()
export class UserPokemonRegisterService {
    constructor(
        @InjectRepository(UserPokemonRegister)
        private entityRepository: Repository<UserPokemonRegister>,
        private jwtService: JwtService,
        private userPoekemonRegisterDetailService: UserPokemonRegisterDetailService
    ) {}

    async createDetail(
        createUserPokemonRegisterDto: CreateUserPokemonRegisterDto,
        userPokemonRegister: UserPokemonRegister
    ): Promise<ResponseInterface> {
        try {
            const newObjectDetail = {
                ...createUserPokemonRegisterDto,
                userPokemonRegister
            };
            const { data: createdRegister } =
                await this.userPoekemonRegisterDetailService.create(
                    newObjectDetail
                );
            return { statusCode: HttpStatus.CREATED, data: createdRegister };
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                data: { error },
                message: error.message
            };
        }
    }

    async createMany(
        createManyUserPokemonRegisterDto: CreateManyUserPokemonRegisterDto,
        token: string
    ): Promise<ResponseInterface> {
        try {
            const { list } = createManyUserPokemonRegisterDto;
            const result = [];

            const userData = await this.jwtService.decode(token);
            const { id: user } = userData;
            const created = this.entityRepository.create({
                user,
                registeredCount: list.length
            });
            const headerRegister = await this.entityRepository.save(created);
            await Promise.all(
                list.map(async createUserPokemonRegisterDto => {
                    const resultInsert = await this.createDetail(
                        createUserPokemonRegisterDto,
                        headerRegister
                    );
                    result.push(resultInsert);
                })
            );
            return { statusCode: HttpStatus.CREATED, data: result };
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                data: { error },
                message: error.message
            };
        }
    }

    async findAll(onlyPendings = false): Promise<ResponseInterface> {
        try {
            const addWhere = onlyPendings
                ? { accepted: RegisterStateCollection.PENDIENTE }
                : '';
            const data = await this.entityRepository.find({
                where: { state: StateCollection.ACTIVE, ...addWhere },
                relations: ['user']
            });
            return { statusCode: HttpStatus.OK, data };
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                data: { error },
                message: error.message
            };
        }
    }

    async findAllByUser(userId: string): Promise<ResponseInterface> {
        try {
            const data = await this.entityRepository.find({
                where: {
                    state: StateCollection.ACTIVE,
                    user: Like(`%${userId}%`)
                },
                relations: ['userPokemonRegisterDetails']
            });
            return { statusCode: HttpStatus.OK, data };
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                data: { error },
                message: error.message
            };
        }
    }

    async findOne(id: string): Promise<ResponseInterface> {
        try {
            const data = await this.entityRepository.findOne({
                where: { id, state: StateCollection.ACTIVE }
            });
            return { statusCode: HttpStatus.OK, data };
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                data: { error },
                message: error.message
            };
        }
    }

    async update(
        id: string,
        updateUserPokemonRegisterDto: UpdateUserPokemonRegisterDto
    ): Promise<ResponseInterface> {
        try {
            let entity = await this.entityRepository.findOne({ where: { id } });
            entity = Object.assign(entity, updateUserPokemonRegisterDto);
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
