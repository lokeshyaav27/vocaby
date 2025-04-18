import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpensesService } from './expenses.service';

@ApiTags('expenses')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('expenses')
export class ExpensesController {
    constructor(private readonly expensesService: ExpensesService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new expense' })
    @ApiResponse({ status: 201, description: 'Expense successfully created.' })
    create(@CurrentUser() user: any, @Body() createExpenseDto: CreateExpenseDto) {
        return this.expensesService.create(user.id, createExpenseDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all expenses' })
    @ApiResponse({ status: 200, description: 'Returns all expenses for the user.' })
    findAll(@CurrentUser() user: any) {
        return this.expensesService.findAll(user.id);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get an expense by id' })
    @ApiResponse({ status: 200, description: 'Returns the specified expense.' })
    findOne(@CurrentUser() user: any, @Param('id') id: string) {
        return this.expensesService.findOne(user.id, +id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update an expense' })
    @ApiResponse({ status: 200, description: 'Expense successfully updated.' })
    update(
        @CurrentUser() user: any,
        @Param('id') id: string,
        @Body() updateExpenseDto: UpdateExpenseDto,
    ) {
        return this.expensesService.update(user.id, +id, updateExpenseDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an expense' })
    @ApiResponse({ status: 200, description: 'Expense successfully deleted.' })
    remove(@CurrentUser() user: any, @Param('id') id: string) {
        return this.expensesService.remove(user.id, +id);
    }
}