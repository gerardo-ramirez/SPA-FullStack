const mongoose = require('mongoose');

//MONGODB_URI importado desde index.js gracias dotenv .

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
})
    .then(db => console.log('db conect'))
    .catch(err => console.log('error'));

module.exports = mongoose;
