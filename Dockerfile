FROM node:18-alpine as base

# https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
RUN apk -U add --no-cache libc6-compat
RUN corepack enable \
    && corepack prepare pnpm@7.1.7 --activate

ENV NEXT_TELEMETRY_DISABLED 1
WORKDIR /app

FROM base as deps

COPY package*.json pnpm*.yaml tsconfig*.json ./
RUN pnpm i --frozen-lockfile

FROM base AS build

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm build

FROM node:18-alpine AS production

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 fox

COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/next.config.js ./next.config.js

COPY --from=build --chown=fox:nodejs /app/.next/standalone ./
COPY --from=build --chown=fox:nodejs /app/.next/static ./.next/static

USER fox
EXPOSE 80
ENV PORT 80

CMD ["node", "server.js"]
