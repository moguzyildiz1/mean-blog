const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dbConfig = require('./config/database');
const path = require('path');

mongoose.Promise = global.Promise;
//console.log(dbConfig.uri);
mongoose.connect(dbConfig.uri, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log('Could not connect to db', err);
    } else {
        //console.log(dbConfig.secret); 
        console.log('Connected to database ' + dbConfig.uri);
    }
});

//Gelen requestler icin verecegimiz view (static files) directorysi
app.use(express.static(__dirname + '/client/dist'));

/**
 * Gelen tum requestlere bu cevabi ver demek
 */
app.get('*', (req, res) => {
    //res.send('Say something...');
    //send() ile basit json object yerine view filein tamamini return eder
    //artik index.html app.listen() sayesinde localhost:3000'de serve edilir
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
})

app.listen(3000, () => {
    console.log('Listen to me. app.listen(3000,()=>{})--;)');
})