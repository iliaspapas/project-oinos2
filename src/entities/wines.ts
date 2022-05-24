import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Double,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import OrderItem from './orderitem';

@Entity()
export default class Wine extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  kind: string;

  @Column()
  date: string;

  @Column('numeric')
  price: Double;

  @OneToMany(() => OrderItem, (item) => item.id)
  item: OrderItem;
}
