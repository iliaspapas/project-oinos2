import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Order } from 'src/entities/order';
import { OrderItem } from 'src/entities/orderitem';
import { Wine } from 'src/entities/wines';
import { Repository } from 'typeorm';

@Injectable()
export class OrderitemsService {
  constructor(
    @Inject('ORDERITEM_REPOSITORY')
    private itemRepository: Repository<OrderItem>,
    private orderRepository: Repository<Order>,
  ) {}
  private orderItem: OrderItem[] = [];
  insertItem = async (itemData: any) => {
    // const wineRepository = await AppDataSource.getRepository(Wine);
    const newItem = new OrderItem();
    const { wine, quantity, orderid } = itemData;
    // if (!(await itemRepository.findOneBy({ wine }))) {
    //   if (await wineRepository.findOneBy({ id: wine })) {
    newItem.wine = wine;
    // } else {
    //   console.log("no such Wine");
    //   return false;
    //}
    newItem.quantity = quantity;
    // if (await orderRepository.findOneBy({ id: orderid })) {
    newItem.order = await this.orderRepository.findOneBy({ id: orderid });
    //} else return false;
    try {
      this.itemRepository.save(newItem);
      return newItem;
    } catch (error) {
      console.log(error);
      return false;
    }
    //} else {
    //console.log("item already exists");
    //return false;
    // }
  };
  getItem = async () => {
    return this.itemRepository.find();
  };
  getSingleItem = async (num) => {
    try {
      const foundItems = this.itemRepository.findOneBy({ id: parseFloat(num) });
      return foundItems;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error, 'Wine not Found');
    }
  };
  deleteItem = async (num) => {
    try {
      const deleteItems = this.itemRepository.findOneBy({
        id: parseFloat(num),
      });
      this.itemRepository.remove(await deleteItems);
      console.log('deleted');
    } catch (error) {
      console.log('ITEM NOT FOUND');
      throw new InternalServerErrorException(error, 'Item did not Deleted');
    }
  };
  putItem = async (num, itemData: any) => {
    const { wine, quantity } = itemData;
    const updateItems = await this.itemRepository.findOneBy({
      id: parseFloat(num),
    });

    if (!updateItems) {
      console.log('ITEM NOT FOUND');
      return false;
    } else {
      if (quantity) updateItems.quantity = quantity;
      if (wine) updateItems.wine = wine;
      this.itemRepository.save(updateItems);

      return updateItems;
    }
  };
}
