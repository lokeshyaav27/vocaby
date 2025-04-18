import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateRecurringTransactionDto } from './dto/create-recurring-transaction.dto';
import { UpdateRecurringTransactionDto } from './dto/update-recurring-transaction.dto';
import { RecurringTransactionsService } from './recurring-transactions.service';

@ApiTags('recurring-transactions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('recurring-transactions')
export class RecurringTransactionsController {
    constructor(private readonly recurringTransactionsService: RecurringTransactionsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new recurring transaction' })
    @ApiResponse({ status: 201, description: 'Recurring transaction successfully created.' })
    create(@CurrentUser() user: any, @Body() createRecurringTransactionDto: CreateRecurringTransactionDto) {
        return this.recurringTransactionsService.create(user.id, createRecurringTransactionDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all recurring transactions' })
    @ApiResponse({ status: 200, description: 'Returns all recurring transactions for the user.' })
    findAll(@CurrentUser() user: any) {
        return this.recurringTransactionsService.findAll(user.id);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a recurring transaction by id' })
    @ApiResponse({ status: 200, description: 'Returns the specified recurring transaction.' })
    findOne(@CurrentUser() user: any, @Param('id') id: string) {
        return this.recurringTransactionsService.findOne(user.id, +id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a recurring transaction' })
    @ApiResponse({ status: 200, description: 'Recurring transaction successfully updated.' })
    update(
        @CurrentUser() user: any,
        @Param('id') id: string,
        @Body() updateRecurringTransactionDto: UpdateRecurringTransactionDto,
    ) {
        return this.recurringTransactionsService.update(user.id, +id, updateRecurringTransactionDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a recurring transaction' })
    @ApiResponse({ status: 200, description: 'Recurring transaction successfully deleted.' })
    remove(@CurrentUser() user: any, @Param('id') id: string) {
        return this.recurringTransactionsService.remove(user.id, +id);
    }

    @Patch(':id/toggle')
    @ApiOperation({ summary: 'Toggle recurring transaction active status' })
    @ApiResponse({ status: 200, description: 'Recurring transaction status successfully toggled.' })
    toggleActive(
        @CurrentUser() user: any,
        @Param('id') id: string,
        @Body('is_active') isActive: boolean,
    ) {
        return this.recurringTransactionsService.toggleActive(user.id, +id, isActive);
    }
}