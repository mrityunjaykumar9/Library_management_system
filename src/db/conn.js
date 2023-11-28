const mongoose = require("mongoose");

const dburl = "mongodb+srv://mrityunjaykumar579:2923@cluster23.sjqtkti.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});