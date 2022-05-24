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
import OrderService from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  addOrder(@Body() body: any) {
    return this.orderService.insertOrder(body);
  }
  @Get()
  getAllOrders() {
    return this.orderService.getOrders();
  }

  @Get(':orderid')
  getOrder(@Param('orderid') orderId) {
    return this.orderService.getSingleOrder(orderId);
  }
  @Delete(':orderid')
  deleteOrder(@Param('orderid') orderId) {
    return this.orderService.deleteSingleOrder(orderId);
  }
  @Put(':orderid')
  updateOrder(@Param('orderid') orderId, @Body() body: any): any {
    return this.orderService.putOrder(orderId, body);
  }
}
