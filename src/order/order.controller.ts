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
import { Roles } from 'src/auth/decorator/roles.decorator';
import OrderService from './order.service';
import { OrderPostDto } from 'src/dto/orderdto/order.post.dto';
import { OrderPutDto } from 'src/dto/orderdto/orderud.put.dto';
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Roles(Role.Admin, Role.User)
  @Post()
  addOrder(@Body() body: OrderPostDto) {
    return this.orderService.insertOrder(body);
  }
  @Roles(Role.Admin)
  @Get()
  getAllOrders() {
    return this.orderService.getOrders();
  }
  @Roles(Role.Admin)
  @Get(':orderid')
  getOrder(@Param('orderid') orderId) {
    return this.orderService.getSingleOrder(orderId);
  }
  @Roles(Role.Admin, Role.User)
  @Put(':orderid')
  updateOrder(@Param('orderid') orderId, @Body() body: OrderPutDto) {
    return this.orderService.putOrder(orderId, body);
  }
}
