import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import Wine from 'src/entities/wines';
@Injectable()
export class WineService {
  insertWine = async (wineData: any) => {
    const { kind, price, date } = wineData;
    const newWine = new Wine();
    newWine.kind = kind;
    newWine.price = price;
    newWine.date = date;
    try {
      return Wine.save(newWine);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error, 'Wine did not inserted');
    }
  };
  getWines = async () => {
    return Wine.find();
  };
  getSingleWine = async (num) => {
    try {
      return Wine.findOne({
        id: parseFloat(num),
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error, 'Wine not Found');
    }
  };

  putWine = async (num, wineData: any) => {
    try {
      const updateWine = await Wine.findOne({
        id: parseFloat(num),
      });
      const { kind, price, date } = wineData;
      if (kind) updateWine.kind = kind;
      if (price) updateWine.price = price;
      if (date) updateWine.date = date;
      return Wine.save(updateWine);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error, 'order did not updated');
    }
  };
}
