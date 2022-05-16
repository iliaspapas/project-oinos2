import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { DataSource } from 'typeorm';
import { WineModule } from './wine/wine.module';
import { OrderitemsModule } from './orderitems/orderitems.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    OrderModule,
    DataSource,
    WineModule,
    OrderitemsModule,
    DatabaseModule,
    OrderitemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
