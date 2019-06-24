const mongoose =  require('mongoose');

const userSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
    unique: true
  },
  Password: {
    type: String,
    required: true
  },
  Token: {
    type: String,
    required: true
  },
  Name: {
    FirstName: {
      type: String,
      required: true
    },
    LastName: {
      type: String,
      required: true
    }
  }
});

let Model = mongoose.model('User', userSchema);

Model.createIndexes();

module.exports = Model;