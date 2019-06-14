const mongoose =  require('mongoose');

const connectDb = () => {
  console.log(`DB_URL : ${process.env.DATABASE_URL}`);
  return mongoose.connect(process.env.DATABASE_URL, {
    autoIndex: false,
    useNewUrlParser: true,
  });
};

module.exports = connectDb;
