import { PartialType } from '@nestjs/swagger';
import { CreateAbstractOfCanvassDto } from './create-abstract-of-canvass.dto';

export class UpdateAbstractOfCanvassDto extends PartialType(CreateAbstractOfCanvassDto) {}
