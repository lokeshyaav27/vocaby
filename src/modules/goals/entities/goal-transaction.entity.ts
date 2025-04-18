import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { FinancialGoal } from './financial-goal.entity';

@Entity('goal_transactions')
export class GoalTransaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    goal_id: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ length: 50 })
    transaction_type: string;

    @Column({ length: 255, nullable: true })
    description: string;

    @Column({ type: 'date' })
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // Relationships
    @ManyToOne(() => FinancialGoal, goal => goal.transactions)
    @JoinColumn({ name: 'goal_id' })
    goal: FinancialGoal;
}