import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { CreateReportDto } from './create-report.dto';

export class UpdateReportDto extends PartialType(CreateReportDto) {
    @ApiProperty({
        description: 'The status of the report',
        example: 'completed',
        maxLength: 50,
        required: false
    })
    @IsString()
    @IsOptional()
    @MaxLength(50)
    status?: string;

    @ApiProperty({
        description: 'URL to the generated report file',
        example: 'https://storage.example.com/reports/report-123.pdf',
        required: false
    })
    @IsString()
    @IsOptional()
    file_url?: string;

    @ApiProperty({
        description: 'The result data of the report',
        example: { totalExpenses: 1250.75, categorySummary: { food: 450.25, transport: 200.50 } },
        required: false
    })
    @IsOptional()
    result_data?: object;
}