FROM node:18-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY public ./public
COPY src ./src
COPY next.config.mjs ./next.config.mjs
COPY tailwind.config.ts ./tailwind.config.ts
COPY postcss.config.mjs ./postcss.config.mjs
COPY tsconfig.json ./tsconfig.json

RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 63001
CMD ["npm", "run", "start", "-p", "63001"]


# FROM node:18

# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . ./app
# EXPOSE 3000
# CMD ["npm", "start"]

