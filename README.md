### 开发
下载安装nodejs开发环境后，克隆代码
```
git clone https://liiklin@bitbucket.org/liiklin/signatureweb.git
```

修改数据库连接，文件在/src/common/config/db.js
运行命令
```
npm install

npm start
```

### 部署

采用 docker 部署的方法

```
docker run -d --name pgsqldb -e PG_USER=docker PG_PASSWORD=ts3qdf postgres
docker exec -it pgsqldb createdb -U docker -W laws
docker run -it --rm --link pgsqldb:db -v `pwd`:/var postgres psql -U docker -W -h db -d laws -f /var/public.sql
docker-compose up -d
```

启动后需要执行初始化sql.

按 docker-compose.yml 中的配置，可访问 http://localhost:8360
