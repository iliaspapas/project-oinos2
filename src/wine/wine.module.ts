import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { WineController } from './wine.controller';
import { WineService } from './wine.service';

@Module({
  imports: [DatabaseModule],
  controllers: [WineController],
  providers: [WineService],
})
export class WineModule {}
