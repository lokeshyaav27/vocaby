import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { RecurringTransaction } from './entities/recurring-transaction.entity';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { RecurringTransactionsController } from './recurring-transactions.controller';
import { RecurringTransactionsService } from './recurring-transactions.service';

@Module({
    imports: [TypeOrmModule.forFeature([Expense, RecurringTransaction])],
    controllers: [ExpensesController, RecurringTransactionsController],
    providers: [ExpensesService, RecurringTransactionsService],
    exports: [ExpensesService, RecurringTransactionsService],
})
export class ExpensesModule { }