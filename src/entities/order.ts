import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  BaseEntity,
  JoinTable,
} from 'typeorm';
import OrderItem from './orderitem';

@Entity()
export default class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @ManyToMany(() => OrderItem, (orderItems) => orderItems.order, {
    cascade: true,
  })
  @JoinTable()
  orderItems: OrderItem[];
}
