const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

async function connect() {
  try {
    await mongoose.connect('mongodb://localhost:27017/hongmat_education_dev', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('connect success');
  } catch (error) {
    console.log('connect fail');
  }
}

module.exports = { connect };
