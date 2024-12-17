import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn
} from 'typeorm';
import { StateCollection } from '../../enums/StateCollection';

@Entity()
export class MedalSequence {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({ name: 'count', nullable: false })
    count: number;

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
}
