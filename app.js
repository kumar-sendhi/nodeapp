const express = require('express');
const chalk = require('chalk')
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path')

const sessionRouter = require('./src/routers/sessionsRouter');
const adminRouter = require('./src/routers/adminRouter');
const authRouter = require('./src/routers/authRouter');


const PORT = process.env.PORT || 3000
const app = express();


//app.use(morgan('combined'));
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname,'/public/')));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('views','./src/views');

app.set('view engine','ejs');



app.use('/session', sessionRouter);
app.use('/admin',adminRouter);
app.use('/auth',authRouter);

app.get("/",(req,res)=>{
    res.render('index', {title: 'Globomantics', data :['a','b','c']});
})

app.listen(3000,()=>{
    debug(`listening to port ${chalk.green(PORT)}`);
})