const user = {
    insert: 'insert into user(id, username, age) value(0, ?, ?);',
    delete: 'delete from user where id=?;',
    queryById: 'select * from user where id=?;',
    queryAll: 'select * from user;',
    update: 'update user set name=?, age=? where id=?;'
}

module.exports = user;