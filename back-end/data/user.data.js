const UserModel = require('../models/user');

module.exports = {
  getAllUser: () => {
    return UserModel.find({});
  }
}
