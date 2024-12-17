import { Injectable, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
/**ADDONS**/
import { ResponseInterface } from '@addons/interfaces/response.interface';
/**ENTITIES**/
import { UserRole } from '@entities/user-role.entity';
/**ENUMS**/
import { StateCollection } from '@enums/StateCollection';
/**DTO**/
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { ResponseDictionary } from '@addons/response/ResponseDictionary';
/**INTERFACE**/

@Injectable()
export class UserRoleService {
    constructor(
        @InjectRepository(UserRole)
        private entityRepository: Repository<UserRole>
    ) {}

    async create(
        createUserRoleDto: CreateUserRoleDto
    ): Promise<ResponseInterface> {
        try {
            const created = this.entityRepository.create(createUserRoleDto);
            const data = await this.entityRepository.save(created);
            return { statusCode: HttpStatus.CREATED, data };
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                data: { error },
                message: error.message
            };
        }
    }

    async findAll(): Promise<ResponseInterface> {
        try {
            const data = await this.entityRepository.find({
                where: { state: StateCollection.ACTIVE }
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

    async findOneByName(name: string): Promise<ResponseInterface> {
        try {
            const data = await this.entityRepository.findOne({
                where: { name, state: StateCollection.ACTIVE }
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
        updateUserRoleDto: UpdateUserRoleDto
    ): Promise<ResponseInterface> {
        try {
            let entity = await this.entityRepository.findOne({ where: { id } });
            entity = Object.assign(entity, updateUserRoleDto);
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
