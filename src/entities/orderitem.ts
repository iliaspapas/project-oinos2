import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  Relation,
  ManyToMany,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import Order from './order';
import Wine from './wines';
@Entity()
export default class OrderItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Wine, (wine) => wine.id)
  @JoinColumn()
  wine: Wine;

  @Column()
  quantity: number;

  @ManyToMany(() => Order, (order) => order.orderItems, {
    cascade: ['insert', 'update'],
  })
  order: Order;
}
