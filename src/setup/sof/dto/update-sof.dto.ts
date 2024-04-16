import { PartialType } from '@nestjs/swagger';
import { CreateSOFDto } from './create-sof.dto';

export class UpdateSOFDto extends PartialType(CreateSOFDto) {}
