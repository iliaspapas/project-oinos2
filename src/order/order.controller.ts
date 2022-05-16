import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Delete,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
  ordersService: any;
  constructor(private readonly appService: OrderService) {}

  @Post()
  addOrder(@Body() body: any): any {
    return this.ordersService.insertOrder(body);
  }
  @Get()
  getAllOrders() {
    return this.ordersService.getOrders();
  }

  @Get(':id')
  getOrder(@Param('/:id') orderId: string) {
    if (this.ordersService.getSingleOrder(orderId)) {
      return this.ordersService.getSingleOrder(orderId);
    } else {
      throw new NotFoundException('Coud not find order');
    }
  }
  @Delete(':id')
  deleteOrder(@Param('/:id') orderId: string) {
    if (this.ordersService.deleteSingleOrder(orderId)) {
      return 'Order deleted';
    }
  }
  @Put()
  updateOrder(@Param('/:id') orderId: string, @Body() body: any): any {
    return this.ordersService.insertOrder(orderId, body);
  }
}
