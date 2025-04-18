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

@Entity('reports')
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column({ length: 100 })
    title: string;

    @Column({ length: 50 })
    report_type: string;

    @Column({ type: 'date' })
    start_date: Date;

    @Column({ type: 'date' })
    end_date: Date;

    @Column({ type: 'json', nullable: true })
    parameters: object;

    @Column({ type: 'json', nullable: true })
    result_data: object;

    @Column({ length: 50, default: 'generated' })
    status: string;

    @Column({ nullable: true })
    file_url: string;

    @Column({ length: 50, nullable: true })
    chart_type: string; // 'pie', 'line', 'bar', etc.

    @Column({ type: 'json', nullable: true })
    chart_config: object;

    @Column({ type: 'json', nullable: true })
    chart_data: object;

    @Column({ type: 'varchar', array: true, nullable: true })
    export_formats: string[]; // ['PDF', 'CSV', etc.]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // Relationships
    @ManyToOne(() => User, user => user.reports)
    @JoinColumn({ name: 'user_id' })
    user: User;
}