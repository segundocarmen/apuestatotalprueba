import { Injectable, HttpStatus } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
/**ADDONS**/
import { ResponseInterface } from '@addons/interfaces/response.interface';
/**ENTITIES**/
import { UserPokemonRegisterDetail } from '@entities/user-pokemon-register-detail.entity';
/**ENUMS**/
import { StateCollection } from '@enums/StateCollection';
/**DTO**/
import { CreateUserPokemonRegisterDetailDto } from './dto/create-user-pokemon-register-detail.dto';
import { UpdateUserPokemonRegisterDetailDto } from './dto/update-user-pokemon-register-detail.dto';

@Injectable()
export class UserPokemonRegisterDetailService {
    constructor(
        @InjectRepository(UserPokemonRegisterDetail)
        private entityRepository: Repository<UserPokemonRegisterDetail>
    ) {}

    async create(
        createUserPokemonRegisterDetailDto: CreateUserPokemonRegisterDetailDto
    ): Promise<ResponseInterface> {
        try {
            const created = this.entityRepository.create(
                createUserPokemonRegisterDetailDto
            );
            const data = await this.entityRepository.save(created);
            return { statusCode: HttpStatus.OK, data };
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                data: error,
                message: error.message
            };
        }
    }

    async findAllByRegister(id: string): Promise<ResponseInterface> {
        try {
            const data = await this.entityRepository.find({
                relations: [],
                where: {
                    state: StateCollection.ACTIVE,
                    userPokemonRegister: Like(`%${id}%`)
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

    async update(
        id: string,
        updateUserPokemonRegisterDetailDto: UpdateUserPokemonRegisterDetailDto
    ): Promise<ResponseInterface> {
        try {
            let entity = await this.entityRepository.findOne({ where: { id } });
            entity = Object.assign(entity, updateUserPokemonRegisterDetailDto);
            const data = await this.entityRepository.save(entity);
            return {
                statusCode: HttpStatus.OK,
                data
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
                data
            };
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                data: error,
                message: `${error.message}`
            };
        }
    }
}
