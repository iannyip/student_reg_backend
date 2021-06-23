import bcrypt from 'bcrypt';

const bcryptHasher = async (input) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(input, salt);
  return hash;
};

export default function initUsersController(db) {
  const index = async (request, response) => {
    try {
      response.redirect('/courses');
    } catch (error) {
      console.log(error);
    }
  };

  const create = async (request, response) => {
    try {
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
      if (user === null) {
        response.render('auth/createLogin', { errorClass: 'd-block' });
      }
      bcrypt.compare(password, user.password, async (err, result) => {
        if (result) {
          response.cookie('userId', user.id);
          response.cookie('session', await bcryptHasher(`${user.id}`));
          response.redirect('/courses');
        } else {
          response.render('auth/createLogin', { errorClass: 'd-block' });
        }
      });
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
