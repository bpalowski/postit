const mongoose = require('mongoose');
const uri = process.env.DB_URI


const connectDB = async () => {

  mongoose.connect(uri, {
    useNewUrlParser: true
  }).then(() => console.log('database started'))
    .catch((err) => console.log(err));
}

module.exports = connectDB;



