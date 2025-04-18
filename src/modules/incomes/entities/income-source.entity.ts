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
import { Income } from './income.entity';

@Entity('income_sources')
export class IncomeSource {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 255, nullable: true })
    description: string;

    @Column({ default: false })
    is_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // Relationships
    @ManyToOne(() => User, user => user.income_sources)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => Income, income => income.source)
    incomes: Income[];
}