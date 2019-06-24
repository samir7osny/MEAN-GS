const UserModel = require('../models/user');
const hat = require('hat');

module.exports = {
  getAllUser: () => {
    return UserModel.find({});
  },

  addUser: data => {
    data.Token = hat();
    let User = UserModel(data);
    return User.save();
  }
}
