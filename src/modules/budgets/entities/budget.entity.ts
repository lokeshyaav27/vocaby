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

@Entity('budgets')
export class Budget {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    category_id: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ length: 50 })
    period: string;

    @Column({ type: 'date' })
    start_date: Date;

    @Column({ type: 'date' })
    end_date: Date;

    @Column({ length: 50, default: 'USD' })
    currency: string;

    @Column({ default: false })
    is_recurring: boolean;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    current_spend: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
    utilization_percentage: number;

    @Column({ default: true })
    alert_enabled: boolean;

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 80 })
    alert_threshold: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // Relationships
    @ManyToOne(() => User, user => user.budgets)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Category, category => category.budgets)
    @JoinColumn({ name: 'category_id' })
    category: Category;
}