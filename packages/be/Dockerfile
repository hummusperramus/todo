FROM oven/bun:latest

WORKDIR /app
COPY package.json .

RUN bun install

COPY . .

EXPOSE 3001

CMD ["bun","run","app.js"]
