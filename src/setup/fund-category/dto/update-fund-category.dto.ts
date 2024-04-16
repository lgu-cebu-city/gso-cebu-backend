import { PartialType } from '@nestjs/swagger';
import { CreateFundCategoryDto } from './create-fund-category.dto';

export class UpdateFundCategoryDto extends PartialType(CreateFundCategoryDto) {}
