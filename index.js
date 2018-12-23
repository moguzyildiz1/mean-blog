const express = require('express');
const app = express();
const mongoose = require('mongoose');

const dbConfig= require('./config/database');

mongoose.Promise = global.Promise;
//console.log(dbConfig.uri);
mongoose.connect(dbConfig.uri,{ useNewUrlParser: true }, (err) =>{
    if(err){
        console.log('Could not connect to db',err);
    } else {
        //console.log(dbConfig.secret); 
        console.log('Connected to database '+dbConfig.uri);
    }
});