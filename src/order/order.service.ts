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
    try {
      const orderRepository = getRepository(Order);
      const order = await orderRepository.find({
        relations: ['orderItems'],
      });
      return order;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error, 'order not Found');
    }
  }
  async getSingleOrder(num: any) {
    try {
      const orderRepository = getRepository(Order);
      const order = await orderRepository.findOne(num, {
        relations: ['orderItems'],
      });
      return order;
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
    const orderRepository = getRepository(Order);
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

      return updateOrder.save();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error, 'order did not updated');
    }
  }
}
