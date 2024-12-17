import { Injectable, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
/**ADDONS**/
import { ResponseInterface } from '@addons/interfaces/response.interface';
/**ENTITIES**/
import { AppSection } from '@entities/app-section.entity';
/**ENUMS**/
import { StateCollection } from '@enums/StateCollection';
/**DTO**/
import { CreateAppSectionDto } from './dto/create-app-section.dto';
import { UpdateAppSectionDto } from './dto/update-app-section.dto';

@Injectable()
export class AppSectionService {
    constructor(
        @InjectRepository(AppSection)
        private entityRepository: Repository<AppSection>
    ) {}

    async create(
        createAppSectionDto: CreateAppSectionDto
    ): Promise<ResponseInterface> {
        try {
            const created = this.entityRepository.create(createAppSectionDto);
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
        updateAppSectionDto: UpdateAppSectionDto
    ): Promise<ResponseInterface> {
        try {
            let entity = await this.entityRepository.findOne({ where: { id } });
            entity = Object.assign(entity, updateAppSectionDto);
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
