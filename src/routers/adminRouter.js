
const express = require('express');
const sessions = require('../data/sessions.json');
const debug = require('debug')('app:adminRouter');
const mongodb=require('mongodb')
const adminRouter = express.Router();


adminRouter.route('/').get((req,res)=>{
    const url = 'mongodb+srv://kumarsendhi:vj54gl9ewRJMWbBR@cluster0.uylginj.mongodb.net/?retryWrites=true&w=majority'
    const dbName = 'globomantics';

    (async function mongo(){
        let client;
        try{
            client = await mongodb.MongoClient.connect(url);
            debug('connected to the mongo DB');

            const db = client.db(dbName);

            const response = await db.collection('sessions').insertMany(sessions);
            res.json(response);

        }
        catch(error){
            debug(error.stack)
        }
        client.close();
    }())
    
})




module.exports = adminRouter;