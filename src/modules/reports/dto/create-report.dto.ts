import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateReportDto {
    @ApiProperty({
        description: 'The title of the report',
        example: 'Monthly Expense Report',
        maxLength: 100
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    title: string;

    @ApiProperty({
        description: 'The type of report',
        example: 'expense_summary',
        maxLength: 50
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    report_type: string;

    @ApiProperty({
        description: 'The start date for the report period',
        example: '2023-01-01'
    })
    @IsDateString()
    @IsNotEmpty()
    start_date: string;

    @ApiProperty({
        description: 'The end date for the report period',
        example: '2023-01-31'
    })
    @IsDateString()
    @IsNotEmpty()
    end_date: string;

    @ApiProperty({
        description: 'Additional parameters for the report generation',
        example: { includeCategories: true, detailedBreakdown: true },
        required: false
    })
    @IsObject()
    @IsOptional()
    parameters?: object;
}