import { Injectable, InternalServerErrorException } from '@nestjs/common';
import Order from 'src/entities/order';
import { getRepository } from 'typeorm';

@Injectable()
export default class OrderService {
  async insertOrder(orderData: any) {
    const { name, lastName, orderItems } = orderData;
    const newOrder = new Order();
    newOrder.name = name;
    newOrder.lastName = lastName;
    newOrder.orderItems = orderItems;

    try {
      return Order.save(newOrder);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error, 'order did not inserted');
    }
  }
  async getOrders() {
    return Order.find({});
  }
  async getSingleOrder(num: any) {
    try {
      return Order.findOne({
        id: parseFloat(num),
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error, 'order not Found');
    }
  }
  async deleteSingleOrder(num) {
    try {
      return Order.delete(num);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error, 'order did not Deleted');
    }
  }
  async putOrder(num, orderData: any) {
    try {
      const updateOrder = await Order.findOne({
        id: parseInt(num),
      });

      const { name, lastName, orderItems } = orderData;
      if (name) updateOrder.name = name;

      if (lastName) updateOrder.lastName = lastName;

      if (orderItems) updateOrder.orderItems = orderItems;
      console.log(updateOrder);
      // await Order.save(updateOrder);
      await updateOrder.save();
      return Order.findOne({
        id: parseInt(num),
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error, 'order did not updated');
    }
  }
}
