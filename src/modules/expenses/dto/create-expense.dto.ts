import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateExpenseDto {
    @ApiProperty({
        description: 'Category ID for the expense',
        example: 1
    })
    @IsNumber()
    @IsNotEmpty()
    category_id: number;

    @ApiProperty({
        description: 'Expense amount',
        example: 50.00
    })
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @ApiProperty({
        description: 'Description of the expense',
        example: 'Grocery shopping at Walmart'
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    description: string;

    @ApiProperty({
        description: 'Date of the expense',
        example: '2025-04-16'
    })
    @IsDateString()
    @IsNotEmpty()
    date: Date;

    @ApiProperty({
        description: 'Currency of the expense',
        example: 'USD',
        default: 'USD'
    })
    @IsString()
    @IsOptional()
    @MaxLength(50)
    currency?: string;

    @ApiProperty({
        description: 'URL of the receipt image',
        example: 'https://storage.example.com/receipts/123.jpg',
        required: false
    })
    @IsString()
    @IsOptional()
    receipt_image_url?: string;

    @ApiProperty({
        description: 'Whether the expense is recurring',
        example: false,
        default: false
    })
    @IsBoolean()
    @IsOptional()
    is_recurring?: boolean;

    @ApiProperty({
        description: 'Frequency of recurrence',
        example: 'monthly',
        required: false
    })
    @IsString()
    @IsOptional()
    @MaxLength(50)
    recurrence_frequency?: string;
}