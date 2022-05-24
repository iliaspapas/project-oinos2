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
  constructor(private readonly itemsService: OrderitemsService) {}
  @Post()
  addItems(@Body() body: any): any {
    return this.itemsService.insertItem(body);
  }
  @Get()
  getAllItems() {
    return this.itemsService.getItem();
  }
  @Get(':id')
  getItem(@Param('id') itemsId: string) {
    if (this.itemsService.getSingleItem(itemsId)) {
      return this.itemsService.getSingleItem(itemsId);
    } else {
      throw new NotFoundException('Coud not find Item');
    }
  }
  @Delete(':id')
  deleteItem(@Param('id') itemsId: string) {
    return this.itemsService.deleteSingleItems(itemsId);
  }
  @Put(':id')
  updateItem(@Param('id') itemsId: string, @Body() body: any): any {
    return this.itemsService.putItem(itemsId, body);
  }
}
