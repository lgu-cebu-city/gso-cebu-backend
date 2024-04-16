import { PartialType } from '@nestjs/swagger';
import { CreateAccountBudgetDto } from './create-accountbudget.dto';

export class UpdateAccountBudgetDto extends PartialType(CreateAccountBudgetDto) {}
