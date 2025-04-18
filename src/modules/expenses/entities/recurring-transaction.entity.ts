import { User } from 'src/modules/users/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity('recurring_transactions')
export class RecurringTransaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column({ length: 50 })
    transaction_type: string; // 'expense' or 'income'

    @Column()
    reference_id: number; // ID of the original expense or income

    @Column({ length: 50 })
    frequency: string; // daily, weekly, monthly, yearly

    @Column({ type: 'json', nullable: true })
    schedule_config: {
        dayOfWeek?: number; // 0-6 for weekly
        dayOfMonth?: number; // 1-31 for monthly
        monthOfYear?: number; // 1-12 for yearly
        interval?: number; // For every X days/weeks/months/years
    };

    @Column({ type: 'date' })
    start_date: Date;

    @Column({ type: 'date', nullable: true })
    end_date: Date;

    @Column({ default: true })
    is_active: boolean;

    @Column({ type: 'date', nullable: true })
    last_generated: Date;

    @Column({ type: 'date', nullable: true })
    next_date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // Relationships
    @ManyToOne(() => User, user => user.recurring_transactions)
    @JoinColumn({ name: 'user_id' })
    user: User;
}