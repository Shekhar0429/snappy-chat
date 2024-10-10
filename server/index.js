const express = require('express');
const dotenv = require('dotenv');
const app = express();

const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userRouter = require('./routes/authRoute');

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 4201;
const dbURI = process.env.DATABASE.replace('<password>', process.env.PASSWORD);

app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true, //to enable cookies
  })
);

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', userRouter);

mongoose
  .connect(dbURI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => console.log('connected to DB')).catch((error) => console.log(error));

const server = app.listen(port, () => {
  console.log('server started');
});
