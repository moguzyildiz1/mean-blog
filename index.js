const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dbConfig = require('./config/database');
const path = require('path'); //NodeJs Package for file paths
const router = express.Router(); // authenticationa parametre olarak verilecek
const authentication = require('./routes/authentication')(router); //(router) parametre olarak gecilir
const bodyParser = require('body-parser'); //Parse incoming request bodies in a middleware before handlers
const cors = require ('cors');


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

//belirli bir domaine izin vermek icin
app.use(cors({
    origin:'http://localhost:4200'
}));
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//Provide static directory for frontend
app.use(express.static(__dirname + '/client/dist'));
//authentication dosyasindaki tum yonlendirmalerde basa /authentication ifadesini koyar
app.use('/authentication', authentication);

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