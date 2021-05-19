const mongoose = require("mongoose");

const options = {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect("mongodb://localhost:27017/Charlie_DB", options).then(
  () => {
    console.log("Db connected");
  },
  (err) => {
    console.log(err);
  }
);
