import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { OrderItem } from './orderitem';
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @ManyToMany(() => OrderItem, (orderItems) => orderItems.order, {
    cascade: true,
  })
  @Column('int', { array: true })
  orderItems: OrderItem[];
}
