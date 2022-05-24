import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import Order from 'src/entities/order';
import OrderItem from 'src/entities/orderitem';
import Wine from 'src/entities/wines';
import { getRepository } from 'typeorm';

@Injectable()
export class OrderitemsService {
  insertItem = async (itemData: any) => {
    const itemRepository = getRepository(OrderItem);
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
    newItem.order = await Order.findOne({ id: orderid });
    //} else return false;
    const item = await itemRepository.findOne(1, { relations: ['wine'] });
    try {
      await OrderItem.save(newItem);
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
    return OrderItem.find();
  };
  getSingleItem = async (num) => {
    try {
      return OrderItem.findOne({ id: parseFloat(num) });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error, 'Item not Found');
    }
  };
  deleteSingleItems = async (num) => {
    try {
      return OrderItem.delete(num);
      console.log('deleted');
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error, 'Item did not Deleted');
    }
  };
  putItem = async (num, itemData: any) => {
    try {
      const { wine, quantity } = itemData;
      const updateItems = await OrderItem.findOne({
        id: parseFloat(num),
      });
      if (quantity) updateItems.quantity = quantity;
      if (wine) updateItems.wine = wine;
      await OrderItem.save(updateItems);

      return OrderItem.findOne({
        id: parseFloat(num),
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error, 'Item did not Deleted');
    }
  };
}
