export default function initUsersController(db) {
  const index = async (request, response) => {
    try {
      const allUsers = await db.User.findAll();
      response.send(allUsers);
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
      console.log(request.body);
      const { email, password } = request.body;
      const user = await db.User.findOne({
        where: { email },
      });
      console.log(user);
      if (user === null || password !== user.password) {
        response.render('auth/createLogin', { errorClass: 'd-block' });
      } else {
        response.cookie('userId', user.id);
        response.redirect('/courses');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // return all methods we define in an object
  return {
    index,
    createLogin,
    verifyLogin,
  };
}
