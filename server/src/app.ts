import { createExpressRouters } from '@interface/http';
import { domainErrHandler } from '@interface/middleware/errorHandler';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import path from 'path';
import { APP_ENV } from './config/env';
import { setupSequelize } from './interface/sequelize';
import { cryptoHelper } from './lib/crypto';
import initModules from './modules';

// Using ES module syntax for async error handling
import 'express-async-errors';

const headerSetter = (req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
};

export default class App {
  public async setup(): Promise<http.Server> {
    const app = express();

    // req.ip 에 ip 담아줌
    app.set('trust proxy', true);
    // post body 설정을 위한 body parser
    app.use(express.urlencoded({ limit: '50mb', extended: false }));
    app.use(express.json({ limit: '50mb' }));
    // 쿠키 파서를 세팅한다.
    app.use(cookieParser());

    // form data 파싱한다.
    app.use(headerSetter);
    app.use(compression());

    // CORS 세팅 해준다.

    const origin =
      APP_ENV == 'prod'
        ? ['localhost:3000', 'localhost:3001']
        : APP_ENV == 'dev'
        ? ['localhost:3000', 'localhost:3001']
        : ['localhost:3000', 'localhost:3001'];

    console.log('CORS Origin', origin);
    app.use(
      cors({
        origin,
        optionsSuccessStatus: 200,
      }),
    );

    await this.initDB();
    cryptoHelper.setup({ jwtSecret: 'test', adminJwtSecret: 'test', bcryptRound: 5 });

    app.use(this.allowCookie);
    app.use(express.static(path.join(__dirname, './public')));

    const modules = await initModules();
    const routers = await createExpressRouters(modules);
    const server = http.createServer(app);
    app.use('/', routers);
    // add error handler
    app.use(domainErrHandler);

    return server;
  }

  private allowCookie(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
  }

  private initDB = async () => {
    await setupSequelize();
  };
}
