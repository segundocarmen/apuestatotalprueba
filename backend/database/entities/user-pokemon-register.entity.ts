import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany
} from 'typeorm';
import { StateCollection } from '../../enums/StateCollection';
import { User } from './user.entity';
import { RegisterStateCollection } from '@enums/register.state.Collection';
import { UserPokemonRegisterDetail } from './user-pokemon-register-detail.entity';

@Entity()
export class UserPokemonRegister {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'registered_count', nullable: false, default: 0 })
    registeredCount: number;

    @Column({
        name: 'accepted',
        nullable: false,
        type: 'enum',
        default: RegisterStateCollection.PENDIENTE,
        enum: RegisterStateCollection
    })
    accepted: RegisterStateCollection;

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

    @ManyToOne(() => User, user => user.userPokemonRegisters, {
        onDelete: 'SET NULL'
    })
    @JoinColumn({ name: 'user' })
    user: User;

    @OneToMany(
        () => UserPokemonRegisterDetail,
        userPokemonRegisterDetails =>
            userPokemonRegisterDetails.userPokemonRegister
    )
    userPokemonRegisterDetails: UserPokemonRegisterDetail[];
}
