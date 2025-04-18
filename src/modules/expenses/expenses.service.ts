import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';

@Injectable()
export class ExpensesService {
    constructor(
        @InjectRepository(Expense)
        private expenseRepository: Repository<Expense>,
    ) { }

    async create(userId: number, createExpenseDto: CreateExpenseDto): Promise<Expense> {
        const expense = this.expenseRepository.create({
            ...createExpenseDto,
            user_id: userId,
        });
        return this.expenseRepository.save(expense);
    }

    async findAll(userId: number): Promise<Expense[]> {
        return this.expenseRepository.find({
            where: { user_id: userId },
            relations: ['category'],
            order: { date: 'DESC', created_at: 'DESC' },
        });
    }

    async findOne(userId: number, id: number): Promise<Expense> {
        const expense = await this.expenseRepository.findOne({
            where: { id, user_id: userId },
            relations: ['category'],
        });

        if (!expense) {
            throw new NotFoundException(`Expense with ID ${id} not found`);
        }

        return expense;
    }

    async update(userId: number, id: number, updateExpenseDto: UpdateExpenseDto): Promise<Expense> {
        const expense = await this.findOne(userId, id);
        Object.assign(expense, updateExpenseDto);
        return this.expenseRepository.save(expense);
    }

    async remove(userId: number, id: number): Promise<void> {
        const expense = await this.findOne(userId, id);
        await this.expenseRepository.remove(expense);
    }
}