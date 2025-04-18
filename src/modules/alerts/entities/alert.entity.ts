import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('alerts')
export class Alert {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column({ length: 100 })
    title: string;

    @Column({ length: 255 })
    message: string;

    @Column({ length: 50 })
    type: string;

    @Column({ default: false })
    is_read: boolean;

    @Column({ type: 'timestamp', nullable: true })
    read_at: Date;

    @Column({ default: true })
    is_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // Relationships
    @ManyToOne(() => User, user => user.alerts)
    @JoinColumn({ name: 'user_id' })
    user: User;
}