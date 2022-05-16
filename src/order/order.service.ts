import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from 'src/entities/order';

//orders wines orderitem
//ftiaxnw databse provider
//error sta services
@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private orderRepository: Repository<Order>,
  ) {}
  private orders: Order[] = [];

  insertOrder = async (orderData: any) => {
    const { name, lastName, orderItems } = orderData;
    const newOrder = new Order();
    newOrder.name = name;
    newOrder.lastName = lastName;
    newOrder.orderItems = orderItems;

    try {
      return this.orderRepository.save(newOrder);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error, 'order did not inserted');
    }
  };
  getOrders = async () => {
    return this.orderRepository.find();
  };
  getSingleOrder = async (num) => {
    try {
      const foundOrder = this.orderRepository.findOneBy({
        id: parseFloat(num),
      });
      return foundOrder;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error, 'order not Found');
    }
  };
  deleteOrder = async (num) => {
    const deleteOrder = this.orderRepository.findOneBy({
      id: parseFloat(num),
    });
    try {
      this.orderRepository.remove(await deleteOrder);
      console.log('deleted');
    } catch (error) {
      console.log('ORDER NOT FOUND');
      throw new InternalServerErrorException(error, 'order did not Deleted');
    }
  };
  putOrder = async (num, orderData: any) => {
    const updateOrder = await this.orderRepository.findOneBy({
      id: parseFloat(num),
    });
    try {
      const { name, lastname, orderItems } = orderData;
      if (name) updateOrder.name = name;
      if (lastname) updateOrder.lastName = lastname;
      if (orderItems) updateOrder.orderItems = orderItems;
      this.orderRepository.save(updateOrder);
      return updateOrder;
    } catch (error) {
      console.log('ORDER NOT FOUND');
      throw new InternalServerErrorException(error, 'order did not updated');
    }
  };
}
