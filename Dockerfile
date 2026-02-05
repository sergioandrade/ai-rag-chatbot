# ------------------------------
# Stage 0: Dependencies
# ------------------------------
FROM node:22-slim AS deps

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile


# ------------------------------
# Stage 1: Build (TypeScript)
# ------------------------------
FROM deps AS build

COPY . .
RUN pnpm run build


# ------------------------------
# Stage 2: Development (hot reload)
# ------------------------------
FROM deps AS dev

COPY . .

EXPOSE 3333
CMD ["pnpm", "run", "dev"]


# ------------------------------
# Stage 3: Production (runtime)
# ------------------------------
FROM node:22-slim AS runtime

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod --frozen-lockfile

EXPOSE 3333
CMD ["node", "dist/server.js"]
