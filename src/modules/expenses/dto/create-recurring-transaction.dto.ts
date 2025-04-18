import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateRecurringTransactionDto {
    @ApiProperty({
        description: 'Transaction type (expense or income)',
        example: 'expense'
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    transaction_type: string;

    @ApiProperty({
        description: 'Reference ID of the original transaction',
        example: 1
    })
    @IsNumber()
    @IsNotEmpty()
    reference_id: number;

    @ApiProperty({
        description: 'Frequency of recurrence',
        example: 'monthly'
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    frequency: string;

    @ApiProperty({
        description: 'Schedule configuration',
        example: { dayOfMonth: 1, interval: 1 }
    })
    @IsObject()
    @IsOptional()
    schedule_config?: {
        dayOfWeek?: number;
        dayOfMonth?: number;
        monthOfYear?: number;
        interval?: number;
    };

    @ApiProperty({
        description: 'Start date of recurring transaction',
        example: '2025-04-16'
    })
    @IsDateString()
    @IsNotEmpty()
    start_date: Date;

    @ApiProperty({
        description: 'End date of recurring transaction',
        example: '2026-04-16',
        required: false
    })
    @IsDateString()
    @IsOptional()
    end_date?: Date;
}