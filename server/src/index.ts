// 모듈 패스를 읽기 위해 module alias 를 사용한다.
require('module-alias/register');
require('source-map-support').install();
require('dotenv').config();
import logger from '@lib/logger';
// set default timezone
import moment from 'moment-timezone';
import App from './app';
moment.tz.setDefault('Asia/Seoul');

const _logger = logger.createLogger('AppRoot');

const PORT = process.env.PORT || '3001';

process.on('uncaughtException', (error) => {
  console.error('Unhandled Exception:', error);
  // 필요한 경우 여기서 로깅, 알림, 또는 재시작 로직을 구현할 수 있음
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // 프로미스 거부를 로그로 남기고 계속 진행
});

const APP = new App();
APP.setup()
  .then((server) => {
    server.listen(PORT, () => {
      _logger.info('Express server listening on port ' + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
