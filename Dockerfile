FROM node:20-alpine AS base
WORKDIR /app

FROM base AS install
COPY package*.json ./
RUN npm ci

FROM base AS build
COPY --from=install /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM build AS run
EXPOSE 3000
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]