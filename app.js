const express = require('express');
const app = express();
const mongoose = require('mongoose');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const multer = require('multer');

var upload = multer({
    dest:__dirname + '/uploads'
});


const config = require('./config/db');
const PORT = 3000;

mongoose.connect(config.DB,{ useNewUrlParser: true}, (err, db) => {
    if(err) {
        console.log('database is not connected')
    }
    else {
        console.log('connected!!')
    }
});

require('./models/Pokemon');
require('./models/Type');

app.use(bodyParser.urlencoded());
app.use(upload.single('file'));
app.use('/', require('./routes/pokemons'));
app.use('/types', require('./routes/types'));

app.use('/uploads', express.static(__dirname + '/uploads'));

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))

 nunjucks.configure('views', {
    autoescape: true,
    express: app
 });

app.listen(PORT, function(){
    console.log('Your node app js is running on PORT:',PORT);
});