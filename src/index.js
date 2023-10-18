const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { auth } = require('./middlewares/authMiddleware.js');

const { PORT, DB_URL } = require('./constants.js');
const routes = require('./router.js');

//Init / Local variables
const app = express();

//Express Configurations
app.use(express.static(path.resolve(__dirname, './public')));
// - body-parser
app.use(express.urlencoded({ extended: false }));
// - cookieParser
app.use(cookieParser());
app.use(auth);

//Handlebars Configuration
app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
// - from where to take the files
app.set('views', 'src/views');

//Database connection
async function dbConnect() {
  await mongoose.connect(DB_URL);
}

dbConnect()
  .then(() => console.log('Successfully connected to the DB'))
  .catch((error) =>
    console.log(`Error while connecting to DB. Error: ${error}`)
  );

//Routes
app.use(routes);

app.listen(PORT, () =>
  console.log(`Server is running and listening on PORT: ${PORT}`)
);
