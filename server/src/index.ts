import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import authRoutes from './api/routes/auth';
import sequelize from './config/database';

dotenv.config();

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 세션 미들웨어 설정
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 24시간
    },
  })
);

// 라우트 설정
app.use('/auth', authRoutes);

// 데이터베이스 연결 및 서버 시작
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('데이터베이스 연결 성공');

    // 개발 환경에서만 사용 (테이블 자동 생성)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('데이터베이스 동기화 완료');
    }

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`서버가 http://localhost:${PORT} 에서 실행중입니다`);
    });
  } catch (error) {
    console.error('데이터베이스 연결 실패:', error);
    process.exit(1);
  }
};

startServer();
