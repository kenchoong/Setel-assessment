import { Injectable, HttpService } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map, concatMap, delay } from 'rxjs/operators';

@Injectable()
export class PaymentService {
  constructor(private httpService: HttpService) {}

  updateOrderStatus(
    orderId: string,
    userId: string,
    status: string,
    url: string,
  ): Observable<any> {
    const hostUrl = url + '/orders/' + orderId;
    const payload = {
      orderStatus: status,
      userId: userId,
    };

    return this.httpService
      .put(hostUrl, payload)
      .pipe(concatMap((x) => of(x).pipe(delay(3000))));
  }
}
