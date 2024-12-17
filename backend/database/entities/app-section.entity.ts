import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToMany,
    JoinTable
} from 'typeorm';
import { StateCollection } from '../../enums/StateCollection';
import { UserRole } from './user-role.entity';

@Entity()
export class AppSection {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({ name: 'path', nullable: false })
    path: string;

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

    @ManyToMany(() => UserRole, role => role.appSections)
    @JoinTable({
        name: 'app_section_user_role',
        joinColumn: {
            name: 'app_section'
        },
        inverseJoinColumn: {
            name: 'user_role'
        }
    })
    roles: UserRole[];
}
