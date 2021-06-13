import moment from 'moment';

export default function initStudentsController(db) {
  const index = async (request, response) => {
    try {
      const allStudents = await db.Student.findAll({
        attributes: ['name', 'dob', 'parentId'],
        include: {
          model: db.User,
          attributes: ['name', 'email'],
        },
      });
      // response.send(allStudents);
      response.render('people/allStudents', { allStudents, moment });
    } catch (error) {
      console.log(error);
    }
  };

  // return all methods we define in an object
  return {
    index,
  };
}