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
import { OrderitemsService } from './orderitems.service';
@Controller('orderitems')
export class OrderitemsController {
  itemsService: any;
  constructor(private readonly appService: OrderitemsService) {}
  @Post()
  addItems(@Body() body: any): any {
    return this.itemsService.insertItem(body);
  }
  @Get()
  getAllItems() {
    return this.itemsService.getItems();
  }
  @Get(':id')
  getItem(@Param('/:id') itemsId: string) {
    if (this.itemsService.getSingleItem(itemsId)) {
      return this.itemsService.getSingleItem(itemsId);
    } else {
      throw new NotFoundException('Coud not find Item');
    }
  }
  @Delete(':id')
  deleteItem(@Param('/:id') itemsId: string) {
    if (this.itemsService.deleteSingleitems(itemsId)) {
      return 'items deleted';
    }
  }
  @Put()
  updateItem(@Param('/:id') itemsId: string, @Body() body: any): any {
    return this.itemsService.insertItem(itemsId, body);
  }
}
