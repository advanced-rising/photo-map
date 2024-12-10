import logger from '@lib/logger';
import initModules from '@modules/index';
import { NextFunction, Request, Response, Router } from 'express';
import authRouter from './auth';

const _logger = logger.createLogger('Router');
export const createExpressRouters = async (modules: Awaited<ReturnType<typeof initModules>>) => {
  const {} = modules;
  const router = Router();

  router.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`Http Request URL: ${req.method}:${req.url} from ${req.ip}`);
    console.log('요청 내용: ', {
      method: req.method,
      url: req.url,
      body: req.body,
      query: req.query,
    });
    next();

    router.get('', (_req: Request, res: Response) => {
      res.send('This is API server');
    });

    _logger.info(`Http Request URL: ${req.url} from ${req.ip}`);
    next();
  });

  // Auth routes
  router.use('/v1/auth', authRouter(modules));

  return router;
};
