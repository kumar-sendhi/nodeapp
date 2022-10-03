
const express = require('express');
const debug = require('debug')('app:sessionRouter');
const mongodb=require('mongodb')
const sessionRouter = express.Router();

sessionRouter.use((req,res, next)=>{
    if(req.user){
        next();
    }
    else{
        res.redirect('/auth/signIn')
    }
    
})
const sessions = require('../data/sessions.json');

sessionRouter.route('/')
.get((req,res)=>{

    const url = 'mongodb+srv://kumarsendhi:vj54gl9ewRJMWbBR@cluster0.uylginj.mongodb.net/?retryWrites=true&w=majority'
    const dbName = 'globomantics';

    (async function mongo(){
        let client;
        try{
            client = await mongodb.MongoClient.connect(url);
            debug('connected to the mongo DB');

            const db = client.db(dbName);

            const sessions = await db.collection('sessions').find().toArray();
            res.render('sessions',{sessions});

        }
        catch(error){
            debug(error.stack)
        }
        client.close();
    }())
    
})

sessionRouter.route('/:id')
.get((req,res)=>{
    const id = req.params.id;
    const url = 'mongodb+srv://kumarsendhi:vj54gl9ewRJMWbBR@cluster0.uylginj.mongodb.net/?retryWrites=true&w=majority'
    const dbName = 'globomantics';

    (async function mongo(){
        let client;
        try{
            client = await mongodb.MongoClient.connect(url);
            debug('connected to the mongo DB');

            const db = client.db(dbName);

            const sessions = await db.collection('sessions').findOne({_id:mongodb.ObjectId(id)});
            res.render('session',{
                session: sessions
            });

        }
        catch(error){
            debug(error.stack)
        }
        client.close();
    }())


    
});


module.exports = sessionRouter;