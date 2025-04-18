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
import { IncomeSource } from './income-source.entity';

@Entity('incomes')
export class Income {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    source_id: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ length: 255 })
    description: string;

    @Column({ type: 'date' })
    date: Date;

    @Column({ length: 50, default: 'USD' })
    currency: string;

    @Column({ default: false })
    is_recurring: boolean;

    @Column({ nullable: true, length: 50 })
    recurrence_frequency: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // Relationships
    @ManyToOne(() => User, user => user.incomes)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => IncomeSource, source => source.incomes)
    @JoinColumn({ name: 'source_id' })
    source: IncomeSource;
}