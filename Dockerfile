FROM daocloud.io/library/node:5.9.0
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json ./package.json
RUN npm install cnpm -g --registry=https://registry.npm.taobao.org && cnpm install
COPY . .
ENV PORT 8360

RUN npm run compile
EXPOSE 8360

CMD node www/production.js

