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
import { OrderitemsService } from './orderitems.service';
@Controller('orderitems')
export class OrderitemsController {
  constructor(private readonly itemsService: OrderitemsService) {}
  @Post()
  @Roles(Role.Admin)
  addItems(@Body() body: any): any {
    return this.itemsService.insertItem(body);
  }
  @Get()
  @Roles(Role.Admin)
  getAllItems() {
    return this.itemsService.getItems();
  }
  @Get(':id')
  @Roles(Role.Admin)
  getItem(@Param('id') itemsId: string) {
    if (this.itemsService.getSingleItem(itemsId)) {
      return this.itemsService.getSingleItem(itemsId);
    } else {
      throw new NotFoundException('Coud not find Item');
    }
  }
  // @Delete(':id')
  // deleteItem(@Param('id') itemsId: string) {
  //   return this.itemsService.deleteSingleItems(itemsId);
  // }
  @Put(':id')
  @Roles(Role.Admin)
  updateItem(@Param('id') itemsId: string, @Body() body: any): any {
    return this.itemsService.putItem(itemsId, body);
  }
}
