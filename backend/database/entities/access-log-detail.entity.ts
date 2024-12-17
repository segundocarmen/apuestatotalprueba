import {
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    Column
} from 'typeorm';
import { AccessLog } from './access-log.entity';

@Entity()
export class AccessLogDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => AccessLog, accessLog => accessLog.accessLogDetails, {
        onDelete: 'SET NULL'
    })
    @JoinColumn({ name: 'access_log' })
    accessLog: AccessLog;

    @Column({ name: 'path', nullable: false })
    path: string;

    @Column({ name: 'order', nullable: false })
    order: number;

    @CreateDateColumn({ name: 'created_at', nullable: false })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', nullable: false })
    updatedAt: Date;
}
