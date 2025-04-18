import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_preferences')
export class UserPreference {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column({ default: 'USD' })
    default_currency: string;

    @Column({ default: 'monthly' })
    default_view_period: string;

    @Column({ default: true })
    email_notifications_enabled: boolean;

    @Column({ default: 'light' })
    theme_preference: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // Relationships
    @OneToOne(() => User, user => user.preference)
    @JoinColumn({ name: 'user_id' })
    user: User;
}