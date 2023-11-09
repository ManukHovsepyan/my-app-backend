const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors")
const app = express();
const productRouter = require('./routes/products');
const authRouter = require('./routes/auth');
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const MONGO_URI = 'mongodb+srv://manukhovsepyan19:sm9Y3osszWgQJxE6@cluster0.vxz3dmq.mongodb.net/my-app-backend?retryWrites=true&w=majority';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/', productRouter);
app.use('/auth', authRouter)

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});