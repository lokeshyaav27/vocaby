import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { BudgetsModule } from './modules/budgets/budgets.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ExpensesModule } from './modules/expenses/expenses.module';
import { ReportsModule } from './modules/reports/reports.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-d00f83pr0fns73e7jhlg-a.virginia-postgres.render.com',
      port: 5432,
      username: 'vocaby_user',
      password: 'm2zkbWOHLU6D0VZjUsJUzKFSk1xcgpCr',
      database: 'vocaby',
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false, // required if using self-signed certs
        },
      },
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Set to false in production
    }),
    AuthModule,
    CategoriesModule,
    BudgetsModule,
    ExpensesModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
//postgresql://vocaby_user:m2zkbWOHLU6D0VZjUsJUzKFSk1xcgpCr@dpg-d00f83pr0fns73e7jhlg-a.virginia-postgres.render.com/vocaby
