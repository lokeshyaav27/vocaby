import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsOptional } from 'class-validator';
import { CreateAlertDto } from './create-alert.dto';

export class UpdateAlertDto extends PartialType(CreateAlertDto) {
    @ApiProperty({
        description: 'Whether the alert has been read',
        example: true,
        required: false
    })
    @IsBoolean()
    @IsOptional()
    is_read?: boolean;

    @ApiProperty({
        description: 'The timestamp when the alert was read',
        example: '2023-05-15T14:30:00Z',
        required: false
    })
    @IsDate()
    @IsOptional()
    read_at?: Date;
}