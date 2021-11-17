import { Controller, Post, Body, Req } from '@nestjs/common';
import { ProcessPaymentDto } from './ProcessPaymentDto';
import { PaymentService } from './payment.service';

import { from, of } from 'rxjs';
import { map, concatMap, delay } from 'rxjs/operators';
import * as lambda from 'aws-lambda';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post()
  async processPayment(@Body() body: ProcessPaymentDto, @Req() req) {
    const url =
      'https://' +
      req.apiGateway.event.headers.Host +
      '/' +
      req.apiGateway.event.requestContext.stage;
    const status = ['Initializing', 'Confirmed'];
    const status2 = ['Initializing', 'Declined'];

    if (Number(body.productId) === 1) {
      from(status)
        .pipe(
          concatMap((stat) =>
            from(
              this.paymentService.updateOrderStatus(
                body.orderId,
                body.userId,
                stat,
                url,
              ),
            ).pipe(map((response) => response.data)),
          ),
        )

        .pipe(concatMap((x) => of(x).pipe(delay(3000))))
        .subscribe((x) => console.log(x));
    } else {
      from(status2)
        // here 2 item inside the array, so will call 2 times with different value
        .pipe(
          concatMap((stat) =>
            from(
              this.paymentService.updateOrderStatus(
                body.orderId,
                body.userId,
                stat,
                url,
              ),
            ).pipe(map((response) => response.data)),
          ),
        )
        // end up have 2 result, delay each one with 5 seconds
        .pipe(concatMap((x) => of(x).pipe(delay(3000))))
        .subscribe((x) => console.log(x));
    }
  }
}
