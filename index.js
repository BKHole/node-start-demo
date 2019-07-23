const express = require('express');
const app = express();
const userRouter = require('./routes/userRouter');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/user', userRouter);

app.listen(3000, () => {
    console.log('相约在浪漫的土耳其，3000')
})