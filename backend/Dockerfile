# Strapi Backend Dockerfile using Node.js LTS
FROM node:22-alpine

# Install build dependencies for better-sqlite3 and sharp
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev python3 git

WORKDIR /opt/app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=development
ENV HOST=0.0.0.0
ENV PORT=1337

EXPOSE 1337

CMD ["npm", "run", "develop"]
