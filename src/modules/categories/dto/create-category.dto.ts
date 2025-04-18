import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
    @ApiProperty({
        description: 'Name of the category',
        example: 'Food & Dining'
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @ApiProperty({
        description: 'Description of the category',
        example: 'This category includes all food and dining related expenses',
        required: false
    })
    @IsString()
    @IsOptional()
    @MaxLength(500)
    description?: string;

    @ApiProperty({
        description: 'Whether this is a default category',
        example: false,
        required: false
    })
    @IsBoolean()
    @IsOptional()
    is_default?: boolean;
}