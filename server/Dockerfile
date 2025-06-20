# ---- Builder Stage ----
# Cria a imagem de build, instala todas as dependências e compila o TS.
FROM node:22-alpine AS builder
WORKDIR /usr/app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# ---- Production Stage ----
# Cria a imagem final, limpa e otimizada.
FROM node:22-alpine
WORKDIR /usr/app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
# Instala somente as dependências de produção.
RUN pnpm install --prod --frozen-lockfile
# Copia os arquivos JS compilados do stage de build.
COPY --from=builder /usr/app/build ./build

# Comando final que executa as migrações e inicia o servidor.
CMD ["sh", "-c", "pnpm run migration:run:prod && pnpm start"]
