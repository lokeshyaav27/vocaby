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

@Entity('expenses')
export class Expense {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    category_id: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ length: 255 })
    description: string;

    @Column({ type: 'date' })
    date: Date;

    @Column({ length: 50, default: 'USD' })
    currency: string;

    @Column({ nullable: true })
    receipt_image_url: string;

    @Column({ default: false })
    is_recurring: boolean;

    @Column({ nullable: true, length: 50 })
    recurrence_frequency: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // Relationships
    @ManyToOne(() => User, user => user.expenses)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Category, category => category.expenses)
    @JoinColumn({ name: 'category_id' })
    category: Category;
}