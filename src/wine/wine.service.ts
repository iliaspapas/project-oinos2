import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import OrderItem from 'src/entities/orderitem';
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
      const foundWine = await Wine.findOne({
        id: parseFloat(num),
      });
      return foundWine;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error, 'Wine not Found');
    }
  };
  deleteSingleWine = async (num) => {
    try {
      // await OrderItem.delete({ wine: num });
      return Wine.delete(num);
      console.log('deleted');
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error, 'Wine did not Deleted');
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
