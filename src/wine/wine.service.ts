import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Wine } from 'src/entities/wines';
import { Repository } from 'typeorm';

@Injectable()
export class WineService {
  constructor(
    @Inject('WΙΝΕ_REPOSITORY')
    private wineRepository: Repository<Wine>,
  ) {}

  private wines: Wine[] = [];
  insertWine = async (wineData: any) => {
    const { kind, price, date } = wineData;
    const newWine = new Wine();
    newWine.kind = kind;
    newWine.price = price;
    newWine.date = date;
    try {
      return this.wineRepository.save(newWine);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error, 'Wine did not inserted');
    }
  };
  getWines = async () => {
    return this.wineRepository.find();
  };
  getSingleWine = async (num) => {
    try {
      const foundWine = this.wineRepository.findOneBy({ id: parseFloat(num) });
      return foundWine;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error, 'Wine not Found');
    }
  };
  deleteWine = async (num) => {
    const deleteWine = this.wineRepository.findOneBy({
      id: parseFloat(num),
    });
    try {
      this.wineRepository.remove(await deleteWine);
      console.log('deleted');
    } catch (error) {
      console.log('Wine NOT FOUND');
      throw new InternalServerErrorException(error, 'Wine did not Deleted');
    }
  };
  putOrder = async (num, wineData: any) => {
    const updateWine = await this.wineRepository.findOneBy({
      id: parseFloat(num),
    });
    try {
      const { kind, price, date } = wineData;
      if (kind) updateWine.kind = kind;
      if (price) updateWine.price = price;
      if (date) updateWine.date = date;
      this.wineRepository.save(updateWine);
      return updateWine;
    } catch (error) {
      console.log('ORDER NOT FOUND');
      throw new InternalServerErrorException(error, 'order did not updated');
    }
  };
}
