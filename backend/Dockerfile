FROM node:12-alpine AS base
WORKDIR /tmp

COPY package*.json ./
RUN npm ci

FROM base AS release
WORKDIR /usr/src/app

COPY --from=base /tmp/node_modules ./node_modules
COPY --from=base /tmp/package*.json ./
COPY src ./src

EXPOSE 3030

CMD ["npm", "start"]
