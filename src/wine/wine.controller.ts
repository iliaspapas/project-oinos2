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
import { WineService } from './wine.service';
@Controller('wines')
export class WineController {
  constructor(private readonly wineService: WineService) {}
  @Post()
  addWine(@Body() body: any): any {
    return this.wineService.insertWine(body);
  }
  @Get()
  getAllWine() {
    return this.wineService.getWines();
  }
  @Get(':id')
  getWine(@Param('id') wineId: string) {
    if (this.wineService.getSingleWine(wineId)) {
      return this.wineService.getSingleWine(wineId);
    } else {
      throw new NotFoundException('Coud not find Wine');
    }
  }
  @Delete(':id')
  deleteWine(@Param('id') wineId: string) {
    this.wineService.deleteSingleWine(wineId);
  }
  @Put(':id')
  updateWine(@Param('id') wineId: string, @Body() body: any): any {
    return this.wineService.putWine(wineId, body);
  }
}
