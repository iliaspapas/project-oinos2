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
    newOrder.status = true;
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
  async getSingleOrder(num: string) {
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
  async statusOrder(num, orderStatus: boolean) {
    try {
      const updateOrder = await Order.findOne({
        id: parseInt(num),
      });
      if (orderStatus) updateOrder.status = orderStatus;
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

      const { name, lastName, orderItems, orderStatus } = orderData;
      if (name) updateOrder.name = name;

      if (lastName) updateOrder.lastName = lastName;

      if (orderItems) updateOrder.orderItems = orderItems;
      if (orderStatus) updateOrder.status = orderStatus;
      console.log(updateOrder);
      // await Order.save(updateOrder);

      return updateOrder.save();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error, 'order did not updated');
    }
  }
}
