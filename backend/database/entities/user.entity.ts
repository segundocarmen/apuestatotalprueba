import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { StateCollection } from '../../enums/StateCollection';
import { AccessLog } from './access-log.entity';
import { UserRole } from './user-role.entity';
import { DoiCollection } from '@enums/DoiCollection';
import { UserPokemonRegister } from './user-pokemon-register.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'complete_name', nullable: false })
    completeName: string;

    @Column({
        name: 'doc_type',
        nullable: false,
        type: 'enum',
        default: DoiCollection.DNI,
        enum: DoiCollection
    })
    docType: DoiCollection;

    @Column({ name: 'doi', nullable: true, default: null })
    doi: string;

    @Column({ name: 'email', nullable: false, unique: true })
    email: string;

    @Column({ name: 'password', nullable: false })
    password: string;

    @Column({ name: 'phone', nullable: true, default: null, length: 30 })
    phone: string;

    @Column({ name: 'address', nullable: true, default: null, length: 150 })
    address: string;

    @Column({
        name: 'state',
        nullable: false,
        type: 'enum',
        default: StateCollection.ACTIVE,
        enum: StateCollection
    })
    state: number;

    @Column({
        name: 'activation_token',
        nullable: true,
        type: 'uuid',
        unique: true,
        default: null
    })
    activationToken: string;

    @Column({
        name: 'reset_password_token',
        nullable: true,
        type: 'uuid',
        unique: true,
        default: null
    })
    resetPasswordToken: string;

    @Column({
        name: 'refresh_token',
        nullable: true,
        default: null,
        type: 'mediumtext'
    })
    refreshToken: string;

    @Column({ name: 'is_oauth', nullable: true, default: null })
    isOauth: boolean;

    @Column({ name: 'is_google', nullable: true, default: null })
    isGoogle: boolean;

    @Column({ name: 'is_ms', nullable: true, default: null })
    isMs: boolean;

    @Column({ name: 'oauth_id', nullable: true, default: null })
    oauthId: string;

    @CreateDateColumn({ name: 'created_at', nullable: false })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', nullable: false })
    updatedAt: Date;

    @OneToMany(() => AccessLog, accessLog => accessLog.user)
    accessLogs: AccessLog[];

    @ManyToOne(() => UserRole, role => role.users, {
        onDelete: 'SET NULL'
    })
    @JoinColumn({ name: 'role' })
    role: UserRole;

    @OneToMany(
        () => UserPokemonRegister,
        userPokemonRegister => userPokemonRegister.user
    )
    userPokemonRegisters: UserPokemonRegister[];
}
