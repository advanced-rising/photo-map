import winston, { format } from 'winston';
const logger = {
  createLogger(moduleName: string) {
    const defaultOptions = {
      level: process.env.NODE_ENV === 'prod' ? 'info' : 'debug',
      format: format.combine(
        format.label({ label: moduleName }),
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.prettyPrint(),
      ),
      transports: [new winston.transports.Console()],
    };

    return winston.createLogger(defaultOptions);
  },
};

export default logger;
