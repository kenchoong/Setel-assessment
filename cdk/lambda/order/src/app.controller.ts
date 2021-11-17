import { Controller, Get, Param, Post, Put, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('status')
  test(): string {
    return 'ok';
  }
}
