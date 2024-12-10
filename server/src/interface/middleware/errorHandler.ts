import { Request } from 'express';

export const notFoundErrorHandler = (req: Request, res, next) => {
  const err: any = new Error(`Not found path: ${req.path}`);
  err.status = 404;
  next(err);
};

export const domainErrHandler = (err, req: Request, res, next) => {
  console.log(`Error Path: ${req.path}`, err);
  const properMsg = err.message || '';
  if (err) {
    let { option, message, code } = err;

    res.status((option && option.status) || 400);
    console.log(err);
    // Parse Joi Error
    res.send({
      error: {
        message: message,
        code,
        payload: option && option.payload ? option.payload : {},
      },
    });
  } else {
    const properMsg = err.message || '';
    if (err?.response?.data) {
      console.log('UNKNOWN error occured: ', err?.response?.data);
    } else {
      console.log(err);
    }
    res.status(400).send({
      error: {
        message: properMsg,
      },
    });
  }
};
