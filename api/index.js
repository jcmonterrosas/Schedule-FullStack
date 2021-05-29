const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { mongoose } = require('./database'); 
const app = express();

//Settings
app.set('port', process.env.PORT || 4000);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routes
app.use(require('./routes/routes'));

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});