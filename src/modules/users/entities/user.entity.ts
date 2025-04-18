import { IncomeSource } from 'src/modules/incomes/entities/income-source.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Alert } from '../../alerts/entities/alert.entity';
import { Budget } from '../../budgets/entities/budget.entity';
import { Category } from '../../categories/entities/category.entity';
import { Expense } from '../../expenses/entities/expense.entity';
import { RecurringTransaction } from '../../expenses/entities/recurring-transaction.entity';
import { FinancialGoal } from '../../goals/entities/financial-goal.entity';
import { Income } from '../../incomes/entities/income.entity';
import { Report } from '../../reports/entities/report.entity';
import { SpendingRule } from '../../rules/entities/spending-rule.entity';
import { UserPreference } from './user-preference.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, unique: true })
    username: string;

    @Column({ length: 255, unique: true })
    email: string;

    @Column()
    password_hash: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // Relationships
    @OneToMany(() => Category, category => category.user)
    categories: Category[];

    @OneToMany(() => Expense, expense => expense.user)
    expenses: Expense[];

    @OneToMany(() => Income, income => income.user)
    incomes: Income[];

    @OneToMany(() => IncomeSource, source => source.user)
    income_sources: IncomeSource[];

    @OneToMany(() => Budget, budget => budget.user)
    budgets: Budget[];

    @OneToMany(() => SpendingRule, rule => rule.user)
    spending_rules: SpendingRule[];

    @OneToMany(() => FinancialGoal, goal => goal.user)
    financial_goals: FinancialGoal[];

    @OneToMany(() => Alert, alert => alert.user)
    alerts: Alert[];

    @OneToMany(() => Report, report => report.user)
    reports: Report[];

    @OneToMany(() => RecurringTransaction, transaction => transaction.user)
    recurring_transactions: RecurringTransaction[];

    @OneToOne(() => UserPreference, preference => preference.user)
    preference: UserPreference;
}