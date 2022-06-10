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
import { Role } from 'src/entities/roles';
import { Roles } from 'src/users/roles.decorator';
import OrderService from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  addOrder(@Body() body: any) {
    return this.orderService.insertOrder(body);
  }
  @Get()
  @Roles(Role.Admin)
  getAllOrders() {
    return this.orderService.getOrders();
  }

  @Get(':orderid')
  @Roles(Role.Admin)
  getOrder(@Param('orderid') orderId) {
    return this.orderService.getSingleOrder(orderId);
  }
  @Put(':orderid')
  updateOrder(@Param('orderid') orderId, @Body() body: any): any {
    return this.orderService.putOrder(orderId, body);
  }
}
