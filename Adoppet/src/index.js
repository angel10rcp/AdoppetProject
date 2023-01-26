const express = require('express');
const path = require('path');
const connectDB = require('./db/connection');
const app = express();

connectDB();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // body en formato json
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine','ejs');
// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(express.json());

// Routes
app.use(require('./routes/lostPet'));
app.use(require('./routes/pet'));
app.use(require('./routes/Person'));
app.use(require('./routes/bulletin'));
//app.use(express.static(__dirname + './views'));
app.use(express.static(path.join(__dirname,'./views')));

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});