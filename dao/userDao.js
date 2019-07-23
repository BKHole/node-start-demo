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