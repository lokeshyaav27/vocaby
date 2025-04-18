import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateBudgetDto {
    @ApiProperty({
        description: 'Category ID for the budget',
        example: 1
    })
    @IsNumber()
    @IsNotEmpty()
    category_id: number;

    @ApiProperty({
        description: 'Budget amount',
        example: 1000.00
    })
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @ApiProperty({
        description: 'Budget period (monthly, yearly, etc.)',
        example: 'monthly'
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    period: string;

    @ApiProperty({
        description: 'Start date of the budget',
        example: '2025-04-01'
    })
    @IsDateString()
    @IsNotEmpty()
    start_date: Date;

    @ApiProperty({
        description: 'End date of the budget',
        example: '2025-04-30'
    })
    @IsDateString()
    @IsNotEmpty()
    end_date: Date;

    @ApiProperty({
        description: 'Currency for the budget',
        example: 'USD',
        default: 'USD'
    })
    @IsString()
    @IsOptional()
    @MaxLength(50)
    currency?: string;

    @ApiProperty({
        description: 'Whether the budget is recurring',
        example: false,
        default: false
    })
    @IsBoolean()
    @IsOptional()
    is_recurring?: boolean;
}