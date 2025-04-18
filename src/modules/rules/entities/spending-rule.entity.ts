import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { User } from '../../users/entities/user.entity';

@Entity('spending_rules')
export class SpendingRule {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    category_id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    threshold_amount: number;

    @Column({ length: 50 })
    condition_type: string;

    @Column({ length: 255, nullable: true })
    description: string;

    @Column({ default: true })
    is_active: boolean;

    @Column({ default: true })
    notify_on_threshold: boolean;

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 80 })
    notification_percentage: number;

    @Column({ default: true })
    email_notifications: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // Relationships
    @ManyToOne(() => User, user => user.spending_rules)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Category, category => category.spending_rules)
    @JoinColumn({ name: 'category_id' })
    category: Category;
}