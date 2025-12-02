FROM node:22-alpine as builder
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . /app

RUN npm run build



FROM node:22-alpine as app
WORKDIR /app

ENV NODE_ENV=production

COPY package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "run", "start"]

