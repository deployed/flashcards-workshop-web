FROM node:22-alpine AS node

FROM node AS builder
ENV NODE_ENV=production
ARG VITE_API_URL
WORKDIR /builder
COPY . .
RUN corepack enable
RUN corepack install
RUN yarn install
RUN yarn build

FROM nginx:alpine AS runner
WORKDIR /app
COPY --from=builder /builder/dist /usr/share/nginx/html