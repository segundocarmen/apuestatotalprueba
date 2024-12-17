import {
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    Column,
    OneToMany
} from 'typeorm';
import { AccessLogDetail } from './access-log-detail.entity';
import { User } from './user.entity';

@Entity()
export class AccessLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.accessLogs, {
        onDelete: 'SET NULL'
    })
    @JoinColumn({ name: 'user' })
    user: User;

    @Column({ name: 'token', nullable: false, type: 'mediumtext' })
    token: string;

    @Column({ name: 'local_time', nullable: false })
    localTime: string;

    @CreateDateColumn({ name: 'created_at', nullable: false })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', nullable: false })
    updatedAt: Date;

    @OneToMany(
        () => AccessLogDetail,
        accessLogDetail => accessLogDetail.accessLog
    )
    accessLogDetails: AccessLogDetail[];
}
