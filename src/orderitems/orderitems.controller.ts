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
import { OrderitemsService } from './orderitems.service';
@Controller('orderitems')
export class OrderitemsController {
  constructor(private readonly itemsService: OrderitemsService) {}
  @Roles(Role.Admin)
  @Post()
  addItems(@Body() body: any): any {
    return this.itemsService.insertItem(body);
  }
  @Roles(Role.Admin)
  @Get()
  getAllItems() {
    return this.itemsService.getItems();
  }

  @Roles(Role.Admin)
  @Get(':id')
  getItem(@Param('id') itemsId: string) {
    return this.itemsService.getSingleItem(itemsId);
  }
  // @Delete(':id')
  // deleteItem(@Param('id') itemsId: string) {
  //   return this.itemsService.deleteSingleItems(itemsId);
  // }
  @Roles(Role.Admin)
  @Put(':id')
  updateItem(@Param('id') itemsId: string, @Body() body: any): any {
    return this.itemsService.putItem(itemsId, body);
  }
}
