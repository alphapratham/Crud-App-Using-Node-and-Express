const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    firstname : String,
    lastname : String
});

module.exports = mongoose.model('users',userModel);