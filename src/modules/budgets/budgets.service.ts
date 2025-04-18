import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { Budget } from './entities/budget.entity';

@Injectable()
export class BudgetsService {
    constructor(
        @InjectRepository(Budget)
        private budgetRepository: Repository<Budget>,
    ) { }

    async create(userId: number, createBudgetDto: CreateBudgetDto): Promise<Budget> {
        const budget = this.budgetRepository.create({
            ...createBudgetDto,
            user_id: userId,
        });
        return this.budgetRepository.save(budget);
    }

    async findAll(userId: number): Promise<Budget[]> {
        return this.budgetRepository.find({
            where: { user_id: userId },
            relations: ['category'],
            order: { created_at: 'DESC' },
        });
    }

    async findOne(userId: number, id: number): Promise<Budget> {
        const budget = await this.budgetRepository.findOne({
            where: { id, user_id: userId },
            relations: ['category'],
        });

        if (!budget) {
            throw new NotFoundException(`Budget with ID ${id} not found`);
        }

        return budget;
    }

    async update(userId: number, id: number, updateBudgetDto: UpdateBudgetDto): Promise<Budget> {
        const budget = await this.findOne(userId, id);
        Object.assign(budget, updateBudgetDto);
        return this.budgetRepository.save(budget);
    }

    async remove(userId: number, id: number): Promise<void> {
        const budget = await this.findOne(userId, id);
        await this.budgetRepository.remove(budget);
    }
}