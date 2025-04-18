import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecurringTransactionDto } from './dto/create-recurring-transaction.dto';
import { UpdateRecurringTransactionDto } from './dto/update-recurring-transaction.dto';
import { RecurringTransaction } from './entities/recurring-transaction.entity';

@Injectable()
export class RecurringTransactionsService {
    constructor(
        @InjectRepository(RecurringTransaction)
        private recurringTransactionRepository: Repository<RecurringTransaction>,
    ) { }

    async create(userId: number, createRecurringTransactionDto: CreateRecurringTransactionDto): Promise<RecurringTransaction> {
        const recurringTransaction = this.recurringTransactionRepository.create({
            ...createRecurringTransactionDto,
            user_id: userId,
            is_active: true,
            next_date: createRecurringTransactionDto.start_date,
        });
        return this.recurringTransactionRepository.save(recurringTransaction);
    }

    async findAll(userId: number): Promise<RecurringTransaction[]> {
        return this.recurringTransactionRepository.find({
            where: { user_id: userId },
            order: { next_date: 'ASC', created_at: 'DESC' },
        });
    }

    async findOne(userId: number, id: number): Promise<RecurringTransaction> {
        const recurringTransaction = await this.recurringTransactionRepository.findOne({
            where: { id, user_id: userId },
        });

        if (!recurringTransaction) {
            throw new NotFoundException(`Recurring transaction with ID ${id} not found`);
        }

        return recurringTransaction;
    }

    async update(userId: number, id: number, updateRecurringTransactionDto: UpdateRecurringTransactionDto): Promise<RecurringTransaction> {
        const recurringTransaction = await this.findOne(userId, id);
        Object.assign(recurringTransaction, updateRecurringTransactionDto);
        return this.recurringTransactionRepository.save(recurringTransaction);
    }

    async remove(userId: number, id: number): Promise<void> {
        const recurringTransaction = await this.findOne(userId, id);
        await this.recurringTransactionRepository.remove(recurringTransaction);
    }

    async toggleActive(userId: number, id: number, isActive: boolean): Promise<RecurringTransaction> {
        const recurringTransaction = await this.findOne(userId, id);
        recurringTransaction.is_active = isActive;
        return this.recurringTransactionRepository.save(recurringTransaction);
    }

    async updateNextDate(id: number, nextDate: Date): Promise<RecurringTransaction> {
        const recurringTransaction = await this.recurringTransactionRepository.findOne({
            where: { id },
        });

        if (!recurringTransaction) {
            throw new NotFoundException(`Recurring transaction with ID ${id} not found`);
        }

        recurringTransaction.last_generated = recurringTransaction.next_date;
        recurringTransaction.next_date = nextDate;
        return this.recurringTransactionRepository.save(recurringTransaction);
    }
}