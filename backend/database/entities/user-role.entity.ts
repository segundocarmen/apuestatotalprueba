import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    OneToMany,
    ManyToMany
} from 'typeorm';
import { StateCollection } from '../../enums/StateCollection';
import { User } from './user.entity';
import { AppSection } from './app-section.entity';

@Entity()
export class UserRole {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({ name: 'initial_section', nullable: false })
    initialSection: string;

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

    @OneToMany(() => User, user => user.role)
    users: User[];

    @ManyToMany(() => AppSection, appSection => appSection.roles)
    appSections: AppSection[];
}
