import jsSha from 'jssha';

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
      const user = await db.User.findOne({
        where: { email },
      });
      if (user === null || hash(password) !== user.password) {
        response.render('auth/createLogin', { errorClass: 'd-block' });
      } else {
        response.cookie('userId', user.id);
        response.cookie('session', hash(user.id));
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
