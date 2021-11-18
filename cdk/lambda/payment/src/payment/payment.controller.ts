import { Controller, Post, Body, Req } from '@nestjs/common';
import { ProcessPaymentDto } from './ProcessPaymentDto';
import { PaymentService } from './payment.service';

import { from, lastValueFrom, of, timer, firstValueFrom } from 'rxjs';
import { map, concatMap, delay, take, tap } from 'rxjs/operators';
import * as lambda from 'aws-lambda';
import { nextTick } from 'process';

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
    const status = ['Confirmed'];
    const status2 = ['Declined'];

    if (Number(body.productId) === 1) {
      const res = await lastValueFrom(
        this.paymentService.updateOrderStatus(
          body.orderId,
          body.userId,
          'Confirmed',
          url,
        ),
      );
      console.log(res.data);

      return {
        ok: true,
        status: 'Called',
      };

      /*
      from(status)
        .pipe(
          concatMap((stat) =>
            from(
              this.paymentService.updateOrderStatus(
                body.orderId,
                body.userId,
                'Confirmed',
                url,
              ),
            ).pipe(map((response) => response.data)),
          ),
        )

        .pipe(concatMap((x) => of(x).pipe(delay(3000))))
        .subscribe({
          next(x) {
            return {
              ok: true,
              status: x,
            };
          },
        });*/
    } else {
      const res = await lastValueFrom(
        this.paymentService.updateOrderStatus(
          body.orderId,
          body.userId,
          'Declined',
          url,
        ),
      );
      console.log(res.data);

      const res1 = await lastValueFrom(
        timer(5000).pipe(
          tap((x) => console.log(x)),
          take(5),
        ),
      );
      console.log(res1);

      return {
        ok: true,
        status: 'Called',
      };

      /*
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
        .subscribe({
          next(x) {
            return {
              ok: true,
              status: x,
            };
          },
        });
        */
    }
  }
}
