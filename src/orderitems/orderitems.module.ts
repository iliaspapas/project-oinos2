import { Module } from '@nestjs/common';
import { OrderitemsService } from './orderitems.service';
import { OrderitemsController } from './orderitems.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [OrderitemsService],
  controllers: [OrderitemsController],
})
export class OrderitemsModule {}
