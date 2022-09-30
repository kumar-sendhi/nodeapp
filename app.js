const express = require('express');
const chalk = require('chalk')
const debug = require('debug')('app');
const morgan = require('morgan');

const app = express();

//app.use(morgan('combined'));
app.use(morgan('tiny'));

app.get("/",(req,res)=>{
    res.send('Hello from my app')
})

app.listen(3000,()=>{
    debug(`listening on port ${chalk.green('3000')}`);
})