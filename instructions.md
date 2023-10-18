1. Init the project and structure / Setup Developer environment

   - add .gitignore
     -> npm init -y
     -> npm i express
     -> npm i express-handlebars
     -> npm i nodemon -D

   --> Change the script in package.json to start: 'nodemon src/index.js'
   --> in src folder make index.js file and console.log something to check if its working / npm start
   --> In src/ make a file constants.js where you will keep the constants:

---

const CONFIG = {
PORT: 3000,
};

module.exports = CONFIG;

---

    --> Then in index.js:

---

const express = require('express');
const app = express();

const { PORT } = require('./constants.js');

app.get('/', (req, res) => {
res.send('Home page is Working');
});

app.listen(PORT, () =>
console.log(`Server is running and listening on PORT: ${PORT}`)
);

---

2. Configure body/parser:
   - in index.js -->

---

app.use(express.urlencoded({ extended: false }));

---

    - in src folder, make a folder public, and move the css and the img folders there
    - in src folder, make a folder views, and move the html files(views) there

    - COnfigure static middleware, in index.js -->

---

const path = require('path');
app.use(express.static(path.resolve(\_\_dirname, './public')));

---

3. Configure Routes:
   - in src folder make a router.js file

---

const router = require('express').Router();

module.exports = router;

---

    - then in index.js

---

const routes = require('./router.js');
app.use(routes);

---

4. Configure view engine / Handlebars
   - in index.js:

---

const handlebars = require('express-handlebars');
app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
app.set('views', 'src/views');

---

    - add main layout
        -> in views, make a folder named layouts, and in that folder add main.hbs
    - fix the styles
        -> in the main.hbs, change the css link to /css/style.css, and elsewhere you see ./static
    - render home page in hbs
        -> in layouts/main.hbs delete what is inside main, and make {{{body}}}
        -> then make the copy of the main.hbs and call it home.hbs, and move it in views
        -> delete everything but leave main (do the same for the rest of html views files)
        -> in index.js render the home

---

//Routes
app.get('/', (req, res) => {
res.render('home');
});

---

    - group views in folders by meaning

5. Add Controller folder

   - add Home controller
     --> move the app.get('/'....) to homecontroller, and use router instead of app.
     --> import the homeController into router, and router.use(homeController);

6. Add database
   - install mongoose / npm i mongoose
   - connect to db
     --> in constants.js add DB_URL and import in index.js
   - in index.js

---

//Database connection
async function dbConnect() {
await mongoose.connect(DB_URL);
}

dbConnect()
.then(() => console.log('Successfully connected to the DB'))
.catch((error) =>
console.log(`Error while connecting to DB. Error: ${error}`)
);

---

7. Prepare user functionality

   - user controller
   - add controller to routes
   - fix navigation in the navbar (login, register, logout)
     -> in login and register.hbs files remove from the form action="#" and make method='POST'
   - render login page / userController.js
   - render register page / userController.js

8. Add User model (models folder / User.js)

   - simple validation in Schema
   - add method for register

9. Add Services folder to src

   - create userService.js
   - create the first user record in DB
   - validate password missmatch
   - validate email already exists

10. Hash Password

    - npm i bcrypt
    - hash password

11. Login Functionality

    - find user by email
    - validate password with hash

12. Generate jsonwebtoken

    - npm i jsonwebtoken
    - promisify jsonwebtoken --> src/lib/jwt.js
    - generate secret / uuid generator --> save it to constants.js
    - generate token in service login --> userService.js (jwt, payload, etc)

13. Return token in cookie

    - npm i cookie-parser
    - configure cookie-parser
    - set cookie with the token

14. Implement Logout Functionality

15. Authentication middleware

    - create middleware directory -> src/middlewares
    - add auth middleware and import it in express configuration below cookieParser
    - decode the token
    - handle invalid token
    - provide authorization

16. Dynamic navigation

    - conditional options in nav --> main.hbs
    - add user and data to res.locals for hbs templates

17. Error handling

    - add 404 page
    - redirect missing route to 404
    - add error message util

18. Show error notification

    - show in the main layout
    - pass error to render in login and register pages
      (to check how to debug, watch 1st ExamPreparation when 20 mins are remaining)

19. Automatically login after register
