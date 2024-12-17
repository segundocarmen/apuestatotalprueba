import { Injectable, HttpStatus } from '@nestjs/common';
import { MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
/**ADDONS**/
import { ResponseInterface } from '@addons/interfaces/response.interface';
/**ENTITIES**/
import { MedalSequence } from '@entities/medal-sequence.entity';
/**ENUMS**/
import { StateCollection } from '@enums/StateCollection';
/**DTO**/
import { CreateMedalSequenceDto } from './dto/create-medal-sequence.dto';
import { UpdateMedalSequenceDto } from './dto/update-medal-sequence.dto';
import { ResponseDictionary } from '@addons/response/ResponseDictionary';
import { JwtService } from '@nestjs/jwt';
import { UserPokemonRegisterService } from '@src/user-pokemon-register/user-pokemon-register.service';
/**INTERFACE**/

@Injectable()
export class MedalSequenceService {
    constructor(
        @InjectRepository(MedalSequence)
        private entityRepository: Repository<MedalSequence>,
        private jwtService: JwtService,
        private userPokemonRegisterService: UserPokemonRegisterService
    ) {}

    async create(
        createMedalSequenceDto: CreateMedalSequenceDto
    ): Promise<ResponseInterface> {
        try {
            const created = this.entityRepository.create(
                createMedalSequenceDto
            );
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

    async validateMedals(token: string): Promise<ResponseInterface> {
        try {
            const userData = await this.jwtService.decode(token);
            const { id: user } = userData;
            const { data: registersByUser } =
                await this.userPokemonRegisterService.findAllByUser(user);
            let total = 0;
            registersByUser.map((item: any) => {
                total = total + item.registeredCount;
            });
            const { data: medals } = await this.findAll();
            const result = medals.filter(item => total > item.count);
            let finaldata;
            if (result.length < 1) {
                const { data: defaultMedal } =
                    await this.findOneByName('MADERA');
                const object = {
                    default: {
                        name: null,
                        pendingPoints: defaultMedal.count - total
                    },
                    next: defaultMedal
                };
                finaldata = object;
            } else {
                const defaultMedal = result.reduce((previous, current) => {
                    return current.count > previous.count ? current : previous;
                });
                const next = await this.entityRepository.find({
                    where: {
                        state: StateCollection.ACTIVE,
                        count: MoreThan(defaultMedal.count)
                    },
                    order: {
                        count: 'ASC'
                    },
                    skip: 0,
                    take: 1
                });
                const object = {
                    default: {
                        ...defaultMedal,
                        pendingPoints: defaultMedal.count - total
                    },
                    next: next[0]
                };
                finaldata = object;
            }
            return { statusCode: HttpStatus.CREATED, data: finaldata };
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
                where: { state: StateCollection.ACTIVE },
                order: {
                    count: 'ASC'
                }
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
        updateMedalSequenceDto: UpdateMedalSequenceDto
    ): Promise<ResponseInterface> {
        try {
            let entity = await this.entityRepository.findOne({ where: { id } });
            entity = Object.assign(entity, updateMedalSequenceDto);
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
