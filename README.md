# node-start-demo

基于Node+Express+MySQL搭建本地服务器

## 开发环境

- VSCode Version: 1.36.1 (user setup)
- Chrome: 69.0.3497.128
- Node.js: 10.11.0
- V8: 6.9.427.31-electron.0
- OS: Windows_NT x64 10.0.17134
- MySQL: 5.7.26
- Navcicat for MySQL: 11.1.13
- ES6

## 步骤

### 1、初始化项目node-start-demo

```
md node-start-demo
md config
md dao
md routes
npm init
```

### 2、安装依赖包

```
npm i express mysql body-parser
```
> note: "body-parser": "^1.19.0", "express": "^4.17.1", "mysql": "^2.17.1"

### 3、创建服务器启动入口文件index.js

```
// 入口文件 node-start-demo/index.js
const express = require('express');
const app = express();
const userRouter = require('./routes/userRouter');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
// 添加user接口路由
app.use('/user', userRouter);

app.listen(3000, () => {
    console.log('相约在浪漫的土耳其，3000')
})
```

### 4、创建数据库配置文件db.js

```
// conf/db.js
// MySQL数据库联接配置
module.exports = {
	mysql: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'node_demo',
        port: '3306'
	}
}; 

```

> ps: 在Navicat for MySQL中创建MySQL连接，新建node_demo数据库，然后在数据库中新建user表，可利用sql目录下导入user.sql执行，不同环境下可能字段编码格式差异导致失败

### 5、创建user表SQL命令文件userSqlMapping.js

```
// dao/userSqlMapping.js
// CRUD SQL语句
const user = {
	insert:'insert into user(id, name, age) values(0,?,?);',
	update:'update user set name=?, age=? where id=?;',
	delete: 'delete from user where id=?;',
	queryById: 'select * from user where id=?;',
	queryAll: 'select * from user;'
};
 
module.exports = user;
```

### 6、创建数据库user表操作管理文件userDao.js

```
// dao/userDao.js
// 实现与MySQL交互
// 创建数据库连接及相关操作
const mysql = require('mysql');
const $db = require('../config/db');
const $sql = require('./userSqlMapping');

// 使用连接池，提高性能
const pool = mysql.createPool($db.mysql);

// 向前台返回JSON方法的简单封装
const jsonWrite = (res, ret) => {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};
// 向user表插入数据
const addUser = (req, res) => {
    pool.getConnection((err, connection) => {
        const param = req.query || req.param;
        connection.query($sql.insert, [param.name, param.age], (err, result) => {
            if (result) {
                result = {
                    code: '200',
                    msg: 'success'
                }
            }
            jsonWrite(res, result);

            connection.release();
        })
    })
};
const deleteUser = (req, res) => {
    pool.getConnection((err, connection) => {
        const id = +req.query.id;
        connection.query($sql.delete, id, (err, result) => {
            if (result.affectedRows > 0) {
                result = {
                    code: 200,
                    msg: '删除成功'
                };
            } else {
                result = void 0;
            }
            jsonWrite(res, result);

            connection.release();
        })
    })
};

const queryById = (req, res) => {
    const id = +req.query.id; // 为了拼凑正确的sql语句，这里要转下整数
    pool.getConnection((err, connection) => {
        connection.query($sql.queryById, id, (err, result) => {
            jsonWrite(res, result);
            connection.release();

        });
    });
};
const queryAll = (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query($sql.queryAll, (err, result) => {
            jsonWrite(res, result);
            connection.release();
        });
    });
};

const updateUser = (req, res) => {
    pool.getConnection((err, connection) => {
        const param = req.body;
        console.log('body', req.body);
        connection.query($sql.update, [param.name, param.age, +param.id], (err, result) => {
            // 使用页面进行跳转提示
            if (result.affectedRows > 0) {
                result = {
                    code: 200,
                    msg: '更新成功'
                };
            } else {
                result = void 0;
            }
            jsonWrite(res, result);

            connection.release();
        })
    })
}

module.exports = {
    addUser,
    deleteUser,
    queryAll,
    queryById,
    updateUser
}
```

### 7、创建接口路由文件userRouter.js

```
// 接口路由 routes/userRouter.js

const express = require('express');
const router = express.Router();

const userDao = require('../dao/userDao');

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

router.get('/addUser', (req, res) => {
    userDao.addUser(req, res);
});

router.get('/queryById', (req, res) => {
    userDao.queryById(req, res);
});

router.get('/queryAll', (req, res) => {
    userDao.queryAll(req, res);
});

router.get('/deleteUser', (req, res) => {
    userDao.deleteUser(req, res);
});

router.post('/updateUser', (req, res) => {
    userDao.updateUser(req, res);
})

module.exports = router;
```

### 8、终端启动服务器

```
node index.js
```

### 9、接口访问演示

浏览器访问地址

> 新增user

```
http:localhost:3000/user/addUser?name=hello&age=111
```

> 查询所有user

```
http:localhost:3000/user/queryAll
```

> 根据id查询user

```
http:localhost:3000/user/query?id=1
```

> 根据id删除user

```
http:localhost:3000/user/deleteUser?id=1
```

> 根据id更新name和age

```
<!-- post请求更新数据  routes/index.html -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>node-express-mysql</title>
</head>

<body>
    <form action="http://127.0.0.1:3000/user/updateUser" method="POST">
        id:<input type="text" name="id"> <br>
        username:<input type="text" name="name"> <br>
        age:<input type="text" name="age"> <br>
        <input type="submit" value="Submit">
    </form>
</body>

</html>
```

浏览器访问user根目录

```
http:localhost:3000/user
```

输入id、username、age信息，回车，数据库查看该id信息已更新