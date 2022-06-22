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
import { WineService } from './wine.service';
@Controller('wines')
export class WineController {
  constructor(private readonly wineService: WineService) {}

  @Roles(Role.Admin)
  @Post()
  addWine(@Body() body: any): any {
    return this.wineService.insertWine(body);
  }
  @Roles(Role.Admin)
  @Get()
  getAllWine() {
    return this.wineService.getWines();
  }
  @Roles(Role.Admin)
  @Get(':id')
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
  @Roles(Role.Admin)
  @Put(':id')
  updateWine(@Param('id') wineId: string, @Body() body: any): any {
    return this.wineService.putWine(wineId, body);
  }
}
