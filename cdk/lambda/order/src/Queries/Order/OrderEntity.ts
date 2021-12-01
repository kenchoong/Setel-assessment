// Here is the dynamo schema and stuff
import { Schema } from 'dynamoose';
import { OrderEntity } from 'src/Domain/Order/OrderType';
//import { SharedSchema } from '../SharedSchema';

export const OrderSchema = new Schema({
  PK: {
    type: String,
    hashKey: true,
  },
  SK: {
    type: String,
    rangeKey: true,
  },
  attributes: {
    type: Object,
    schema: {
      productId: Number,
      productName: String,
      totalOrderAmount: String,
      orderStatus: String,
      createdAt: String,
    },
  },
});

export interface IOrderKey {
  PK: string;
  SK: string;
}

export interface IOrderEntity extends Omit<OrderEntity, '_id'> {
  attribute: Object;
}

/*
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}*/
