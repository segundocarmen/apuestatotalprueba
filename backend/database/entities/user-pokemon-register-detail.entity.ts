import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { StateCollection } from '../../enums/StateCollection';
import { UserPokemonRegister } from './user-pokemon-register.entity';

@Entity()
export class UserPokemonRegisterDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'pokemon_id', nullable: false })
    pokemonId: string;

    @Column({ name: 'pokemon_name', nullable: false })
    pokemonName: string;

    @Column({ name: 'pokemon_power', nullable: false })
    pokemonPower: number;

    @Column({
        name: 'state',
        nullable: false,
        type: 'enum',
        default: StateCollection.ACTIVE,
        enum: StateCollection
    })
    state: number;

    @CreateDateColumn({ name: 'created_at', nullable: false })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', nullable: false })
    updatedAt: Date;

    @ManyToOne(
        () => UserPokemonRegister,
        userPokemonRegister => userPokemonRegister.userPokemonRegisterDetails,
        {
            onDelete: 'SET NULL'
        }
    )
    @JoinColumn({ name: 'user_pokemon_register' })
    userPokemonRegister: UserPokemonRegister;
}
