const express = require('express');
const User = require('../data/user.data');

const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/users', (req, res) => {
  User.getAllUser();
});

module.exports = router;
