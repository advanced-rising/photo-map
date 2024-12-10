import initModules from '@modules/index';
import { Request, Response, Router } from 'express';

class Handler {
  private modules: Awaited<ReturnType<typeof initModules>>;
  constructor(modules: Awaited<ReturnType<typeof initModules>>) {
    this.modules = modules;
  }

  public async googleLogin(req: Request, res: Response) {
    return res.send('This is API server');
  }

  public async googleCallback(req: Request, res: Response) {
    return res.send('This is API server');
  }

  public async getAuthStatus(req: Request, res: Response) {
    return res.send('This is API server');
  }

  public async logout(req: Request, res: Response) {
    return res.send('This is API server');
  }
}

const authRouter = (modules: Awaited<ReturnType<typeof initModules>>) => {
  const router = Router();
  const handler = new Handler(modules);

  router.get('/google', handler.googleLogin.bind(handler));
  router.get('/google/callback', handler.googleCallback.bind(handler));
  router.get('/status', handler.getAuthStatus.bind(handler));
  router.post('/logout', handler.logout.bind(handler));

  return router;
};

export default authRouter;
