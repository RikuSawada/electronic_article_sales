# ベースイメージとしてNode.jsを使用
FROM node:18-alpine

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# Vercel CLIのインストール
RUN npm install -g vercel

# ソースコードをコピー
COPY . .

RUN npx prisma generate

# ポート3000でNext.jsが動作するように設定
EXPOSE 3000

# アプリケーションの起動
CMD ["npm", "run", "dev"]
