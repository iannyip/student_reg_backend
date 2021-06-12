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
      await db.User.create({
        // To add create code here
      });
    } catch (error) {
      console.log(error);
    }
  };

  // return all methods we define in an object
  return {
    index,
    create,
  };
}
