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

    try {
      return OrderItem.save(newItem);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error, 'Item not saved');
    }
    //} else {
    //console.log("item already exists");
    //return false;
    // }
  };
  getItems = async () => {
    try {
      const itemRepository = getRepository(OrderItem);
      const item = await itemRepository.find({
        relations: ['wine', 'order'],
      });
      return item;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error, 'Item not Found');
    }
  };
  getSingleItem = async (num) => {
    try {
      const itemRepository = getRepository(OrderItem);
      const item = await itemRepository.findOne(num, {
        relations: ['wine', 'order'],
      });
      return item;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error, 'Item not Found');
    }
  };
  // deleteSingleItems = async (num) => {
  //   try {
  //     return OrderItem.delete(num);
  //   } catch (error) {
  //     console.log(error);
  //     throw new InternalServerErrorException(error, 'Item did not Deleted');
  //   }
  // };
  putItem = async (num, itemData: any) => {
    try {
      const { wine, quantity } = itemData;
      const updateItems = await OrderItem.findOne({
        id: parseFloat(num),
      });
      if (quantity) updateItems.quantity = quantity;
      if (wine) updateItems.wine = wine;
      console.log(updateItems);
      return updateItems.save();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error, 'Item did not Updatedj');
    }
  };
}
