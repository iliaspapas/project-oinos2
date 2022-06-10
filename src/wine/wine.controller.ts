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
import { WineService } from './wine.service';
@Controller('wines')
export class WineController {
  constructor(private readonly wineService: WineService) {}
  @Post()
  @Roles(Role.Admin)
  addWine(@Body() body: any): any {
    return this.wineService.insertWine(body);
  }
  @Get()
  @Roles(Role.Admin)
  getAllWine() {
    return this.wineService.getWines();
  }
  @Get(':id')
  @Roles(Role.Admin)
  getWine(@Param('id') wineId: string) {
    if (this.wineService.getSingleWine(wineId)) {
      return this.wineService.getSingleWine(wineId);
    } else {
      throw new NotFoundException('Coud not find Wine');
    }
  }
  // @Delete(':id')
  // deleteWine(@Param('id') wineId: string) {
  //   return this.wineService.deleteSingleWine(wineId);
  // }
  @Put(':id')
  @Roles(Role.Admin)
  updateWine(@Param('id') wineId: string, @Body() body: any): any {
    return this.wineService.putWine(wineId, body);
  }
}
