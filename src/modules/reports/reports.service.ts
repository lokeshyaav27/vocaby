import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Report)
        private reportRepository: Repository<Report>,
    ) { }

    async create(createReportDto: CreateReportDto): Promise<Report> {
        const report = this.reportRepository.create({
            ...createReportDto,
            status: 'generated',
        });
        return this.reportRepository.save(report);
    }

    async findAll(userId?: number, reportType?: string): Promise<Report[]> {
        const queryBuilder = this.reportRepository.createQueryBuilder('report');

        if (userId) {
            queryBuilder.andWhere('report.user_id = :userId', { userId });
        }

        if (reportType) {
            queryBuilder.andWhere('report.report_type = :reportType', { reportType });
        }

        return queryBuilder.getMany();
    }

    async findOne(id: number): Promise<Report> {
        const report = await this.reportRepository.findOne({ where: { id } });
        if (!report) {
            throw new NotFoundException(`Report with ID ${id} not found`);
        }
        return report;
    }

    async update(id: number, updateReportDto: UpdateReportDto): Promise<Report> {
        const report = await this.findOne(id);
        Object.assign(report, updateReportDto);
        return this.reportRepository.save(report);
    }

    async remove(id: number): Promise<void> {
        const result = await this.reportRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Report with ID ${id} not found`);
        }
    }
}