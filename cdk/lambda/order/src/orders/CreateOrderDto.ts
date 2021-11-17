export class CreateOrderDto {
  userId: string;
  productId: string;
  productName: string;
  totalOrderAmount: string;
  orderStatus: string;
  createdAt: string;
}

export class UpdateOrderDto {
  orderStatus: string;
  userId: string;
}

export class PaymentResultDto {
  ok: boolean;
  paymentID: string;
}
