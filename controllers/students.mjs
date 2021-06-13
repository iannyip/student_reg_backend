export default function initStudentsController(db) {
  const index = async (request, response) => {
    try {
      const allStudents = await db.Student.findAll({
        attributes: ['name', 'dob', 'parentId'],
        include: {
          model: db.User,
          // include: [db.Parent],
        },
      });
      response.send(allStudents);
      // response.render('people/allStudents');
    } catch (error) {
      console.log(error);
    }
  };

  // return all methods we define in an object
  return {
    index,
  };
}
