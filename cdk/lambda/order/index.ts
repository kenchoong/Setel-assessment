import { Server } from 'http';
import { Context } from 'aws-lambda';
import { createServer, proxy, Response } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';
import * as express from 'express';
import { createApp } from './src/main';
import { ResponseAddAccessTokenToHeaderInterceptor } from './src/orders/response-add-access-token-to-header.interceptor';

let cachedServer: Server;

async function bootstrap(): Promise<Server> {
  const expressApp = express();

  const app = await createApp(expressApp);
  app.use(eventContext());
  app.useGlobalInterceptors(new ResponseAddAccessTokenToHeaderInterceptor());
  await app.init();

  return createServer(expressApp);
}

export async function handler(event: any, context: Context): Promise<Response> {
  if (!cachedServer) {
    const server = await bootstrap();
    cachedServer = server;
  }

  return proxy(cachedServer, event, context, 'PROMISE').promise;
}
