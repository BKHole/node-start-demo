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