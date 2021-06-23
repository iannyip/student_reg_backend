import express from 'express';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';

import jsSha from 'jssha';
import bindRoutes from './routes.mjs';

const { SALT } = process.env;
const saltyHash = (input) => {
  const shaObj = new jsSha('SHA-512', 'TEXT', { encoding: 'UTF8' });
  const unhashedString = `${input}-${SALT}`;
  shaObj.update(unhashedString);
  return shaObj.getHash('HEX');
};

const hash = (input) => {
  const shaObj = new jsSha('SHA-512', 'TEXT', { encoding: 'UTF8' });
  const unhashedString = `${input}`;
  shaObj.update(unhashedString);
  return shaObj.getHash('HEX');
};

// Initialise Express instance
const app = express();
// Set the Express view engine to expect EJS templates
app.set('view engine', 'ejs');
// Bind cookie parser middleware to parse cookies in requests
app.use(cookieParser());
// Bind Express middleware to parse request bodies for POST requests
app.use(express.urlencoded({ extended: false }));
// Bind method override middleware to parse PUT and DELETE requests sent as POST requests
app.use(methodOverride('_method'));
// Expose the files stored in the public folder
app.use(express.static('public'));
// Custom Middleware to verify hash and set request flag
app.use((request, response, next) => {
  request.isUserLoggedIn = false;
  if (request.path === '/login') {
    next();
    return;
  }
  if (request.cookies.session && request.cookies.userId) {
    const hashedUser = saltyHash(request.cookies.userId);
    if (request.cookies.session === hashedUser) {
      request.isUserLoggedIn = true;
      next();
      return;
    }
  }
  response.redirect('/login');
});

// Bind route definitions to the Express application
bindRoutes(app);

// Set Express to listen on the given port
const PORT = process.env.PORT || 3004;
app.listen(PORT);
