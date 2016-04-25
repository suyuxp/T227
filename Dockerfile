FROM daocloud.io/library/node:5.9.0
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
ENV PORT 8360
EXPOSE 8360
# 线上环境
RUN npm run compile
ENTRYPOINT node www/production.js 