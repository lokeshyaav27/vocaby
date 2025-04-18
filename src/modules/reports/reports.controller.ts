import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Report } from './entities/report.entity';
import { ReportsService } from './reports.service';

@ApiTags('reports')
@ApiBearerAuth()
@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new report' })
    @ApiCreatedResponse({
        description: 'The report has been successfully created.',
        type: Report
    })
    create(@Body() createReportDto: CreateReportDto) {
        return this.reportsService.create(createReportDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all reports' })
    @ApiQuery({ name: 'userId', required: false, description: 'Filter reports by user ID' })
    @ApiQuery({ name: 'reportType', required: false, description: 'Filter reports by type' })
    @ApiOkResponse({
        description: 'Returns all reports based on filters',
        type: [Report]
    })
    findAll(
        @Query('userId') userId?: number,
        @Query('reportType') reportType?: string,
    ) {
        return this.reportsService.findAll(userId, reportType);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a report by ID' })
    @ApiParam({ name: 'id', description: 'Report ID' })
    @ApiOkResponse({
        description: 'Returns the report with the specified ID',
        type: Report
    })
    findOne(@Param('id') id: string) {
        return this.reportsService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a report' })
    @ApiParam({ name: 'id', description: 'Report ID' })
    @ApiOkResponse({
        description: 'The report has been successfully updated.',
        type: Report
    })
    update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
        return this.reportsService.update(+id, updateReportDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a report' })
    @ApiParam({ name: 'id', description: 'Report ID' })
    @ApiOkResponse({ description: 'The report has been successfully deleted.' })
    remove(@Param('id') id: string) {
        return this.reportsService.remove(+id);
    }
}