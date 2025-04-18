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
import { Budget } from '../../budgets/entities/budget.entity';
import { Expense } from '../../expenses/entities/expense.entity';
import { SpendingRule } from '../../rules/entities/spending-rule.entity';
import { User } from '../../users/entities/user.entity';

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 500, nullable: true })
    description: string;

    @Column({ default: false })
    is_default: boolean;

    @Column({ type: 'varchar', array: true, nullable: true })
    tags: string[];

    @Column({ length: 50, nullable: true })
    icon: string;

    @Column({ length: 7, nullable: true })
    color: string; // Hex color code

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // Relationships
    @ManyToOne(() => User, user => user.categories)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => Expense, expense => expense.category)
    expenses: Expense[];

    @OneToMany(() => Budget, budget => budget.category)
    budgets: Budget[];

    @OneToMany(() => SpendingRule, rule => rule.category)
    spending_rules: SpendingRule[];
}