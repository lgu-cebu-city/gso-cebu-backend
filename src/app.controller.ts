import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Index')
@Controller({ path: 'index', version: '1' })
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  Index() {
    return "GSO Index";
  }
}
