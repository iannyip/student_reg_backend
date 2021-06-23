import jsSha from 'jssha';

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

export default function initUsersController(db) {
  const index = async (request, response) => {
    try {
      const allUsers = await db.User.findAll();
      response.send(allUsers);
    } catch (error) {
      console.log(error);
    }
  };

  const create = async (request, response) => {
    try {
      const newUser = await db.User.create({
        name: 'ian',
        mobile: '98765432',
        email: 'ian@email.com',
        password: 'qwerty',
        isAdmin: true,
        isParent: false,
      });
      response.redirect('/courses');
    } catch (error) {
      console.log(error);
    }
  };

  const createLogin = async (request, response) => {
    try {
      response.render('auth/createLogin', { errorClass: 'd-none' });
    } catch (error) {
      console.log(error);
    }
  };

  const verifyLogin = async (request, response) => {
    try {
      const { email, password } = request.body;
      console.log(email);
      console.log(password);
      const user = await db.User.findOne({
        where: { email },
      });
      console.log(user);
      if (user === null || hash(password) !== user.password) {
        console.log(hash(hash(password)));
        response.render('auth/createLogin', { errorClass: 'd-block' });
      } else {
        response.cookie('userId', user.id);
        response.cookie('session', saltyHash(user.id));
        response.redirect('/courses');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async (request, response) => {
    try {
      response.clearCookie('userId');
      response.clearCookie('session');
      response.redirect('/login');
    } catch (error) {
      console.log(error);
    }
  };

  // return all methods we define in an object
  return {
    index,
    create,
    createLogin,
    verifyLogin,
    logout,
  };
}
