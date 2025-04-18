import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { GoalTransaction } from './goal-transaction.entity';

@Entity('financial_goals')
export class FinancialGoal {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 255, nullable: true })
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    target_amount: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    current_amount: number;

    @Column({ type: 'date' })
    target_date: Date;

    @Column({ length: 50, default: 'USD' })
    currency: string;

    @Column({ length: 50 })
    status: string;

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
    progress_percentage: number;

    @Column({ length: 50, default: 'in_progress' })
    achievement_status: string; // 'not_started', 'in_progress', 'achieved', 'missed'

    @Column({ type: 'json', nullable: true })
    milestones: object; // Store milestone targets and achievements

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // Relationships
    @ManyToOne(() => User, user => user.financial_goals)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => GoalTransaction, transaction => transaction.goal)
    transactions: GoalTransaction[];
}