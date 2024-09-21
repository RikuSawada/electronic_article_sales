import { PrismaClient } from '@prisma/client';

declare global {
  // グローバル変数の型を定義
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

// プロダクション環境でない場合、グローバル変数に Prisma クライアントを格納
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
