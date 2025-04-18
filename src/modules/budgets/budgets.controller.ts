import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BudgetsService } from './budgets.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@ApiTags('budgets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('budgets')
export class BudgetsController {
    constructor(private readonly budgetsService: BudgetsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new budget' })
    @ApiResponse({ status: 201, description: 'Budget successfully created.' })
    create(@CurrentUser() user: any, @Body() createBudgetDto: CreateBudgetDto) {
        return this.budgetsService.create(user.id, createBudgetDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all budgets' })
    @ApiResponse({ status: 200, description: 'Returns all budgets for the user.' })
    findAll(@CurrentUser() user: any) {
        return this.budgetsService.findAll(user.id);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a budget by id' })
    @ApiResponse({ status: 200, description: 'Returns the specified budget.' })
    findOne(@CurrentUser() user: any, @Param('id') id: string) {
        return this.budgetsService.findOne(user.id, +id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a budget' })
    @ApiResponse({ status: 200, description: 'Budget successfully updated.' })
    update(
        @CurrentUser() user: any,
        @Param('id') id: string,
        @Body() updateBudgetDto: UpdateBudgetDto,
    ) {
        return this.budgetsService.update(user.id, +id, updateBudgetDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a budget' })
    @ApiResponse({ status: 200, description: 'Budget successfully deleted.' })
    remove(@CurrentUser() user: any, @Param('id') id: string) {
        return this.budgetsService.remove(user.id, +id);
    }
}