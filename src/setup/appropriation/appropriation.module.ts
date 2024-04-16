import { Module } from '@nestjs/common';
import { AppropriationService } from './appropriation.service';
import { AppropriationController } from './appropriation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appropriation } from './entities/appropriation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appropriation])],
  controllers: [AppropriationController],
  providers: [AppropriationService],
  exports: [AppropriationService]
})
export class AppropriationModule {}
