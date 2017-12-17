FROM node:9.3.0-alpine
ENV NODE_ENV=development \
  PORT=3005 \
  PGUSER=postgres \
  PGPASSWORD=postgres \
  PGHOST=db \
  PGDATABASE=clientes
RUN mkdir -p /app/
WORKDIR /app/
ADD package.json /app/
RUN npm install --prod
COPY bin/ /app/bin/
COPY config/ /app/config/
COPY mysql/ /app/libsql/
COPY server/ /app/server/
COPY sql/ /app/sql/
COPY app.js /app/

ENTRYPOINT ["npm", "start"]
