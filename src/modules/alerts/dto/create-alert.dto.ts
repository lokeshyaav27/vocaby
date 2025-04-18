import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAlertDto {
    @ApiProperty({
        description: 'The title of the alert',
        example: 'Budget Exceeded',
        maxLength: 100
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    title: string;

    @ApiProperty({
        description: 'The message content of the alert',
        example: 'Your monthly food budget has been exceeded by 15%',
        maxLength: 255
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    message: string;

    @ApiProperty({
        description: 'The type of alert',
        example: 'budget_exceeded',
        maxLength: 50
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    type: string;

    @ApiProperty({
        description: 'Whether the alert is active',
        example: true,
        default: true,
        required: false
    })
    @IsBoolean()
    @IsOptional()
    is_active?: boolean;
}