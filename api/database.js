const mongoose = require('mongoose');
const URI = 'mongodb://localhost/schedule-db';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(db => console.log('DB is connected'))
  .catch(error => console.error(error));

module.exports = mongoose;