const express = require('express');
const passport = require('passport');
const {Strategy}= require('passport-local')
const debug = require('debug')('app:sessionRouter');
const mongodb=require('mongodb')
const authRouter = express.Router();


authRouter.route('/signUp').post((req,res)=>{
    

    //TODO Create User
    const {username, password} = req.body;
    const url = 'mongodb+srv://kumarsendhi:vj54gl9ewRJMWbBR@cluster0.uylginj.mongodb.net/?retryWrites=true&w=majority'
    const dbName = 'globomantics';

    (async function addUser(){
        let client;
        try{
            client = await mongodb.MongoClient.connect(url);

            const db = client.db(dbName);
            const user = {username, password};
            const results = await db.collection('users').insertOne(user);
            debug(results);

            req.login(result.ops[0],()=>{
                res.redirect('/auth/profile')
            })

        }catch(error){
            debug(error.stack)
        }

    }())

    req.login(req.body, ()=>{
        res.redirect('/auth/profile')
    })
})

authRouter.route('/signIn').get((req,res)=>{
    res.render('signin')
}).post(passport.authenticate('local',{
    successRedirect: '/auth/profile',
    failureMessage:"/"
}))


authRouter.route('/profile').get((req,res)=>{
    res.json(req.user);
})


module.exports = authRouter;