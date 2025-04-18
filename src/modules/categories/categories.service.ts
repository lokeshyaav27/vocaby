import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) { }

    async create(userId: number, createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = this.categoryRepository.create({
            ...createCategoryDto,
            user_id: userId,
        });
        return this.categoryRepository.save(category);
    }

    async findAll(userId: number): Promise<Category[]> {
        return this.categoryRepository.find({
            where: { user_id: userId },
            order: { created_at: 'DESC' },
        });
    }

    async findOne(userId: number, id: number): Promise<Category> {
        const category = await this.categoryRepository.findOne({
            where: { id, user_id: userId },
        });

        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }

        return category;
    }

    async update(userId: number, id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        const category = await this.findOne(userId, id);
        Object.assign(category, updateCategoryDto);
        return this.categoryRepository.save(category);
    }

    async remove(userId: number, id: number): Promise<void> {
        const category = await this.findOne(userId, id);
        await this.categoryRepository.remove(category);
    }
}