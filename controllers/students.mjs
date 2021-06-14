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
      // console.log(allStudents);
      response.render('people/students', { allStudents, moment });
    } catch (error) {
      console.log(error);
    }
  };
  const show = async (request, response) => {
    try {
      const { id } = request.params;
      const student = await db.Student.findOne({
        where: { id },
        include: [
          {
            // Table 1: parent
            model: db.User,
            attributes: ['name', 'email'],
          },
          {
            // Table 2: signups
            model: db.Course,
            include: db.Coursetype,
          }],
      });
      // response.send(student);
      response.render('people/student', { student, moment });
    } catch (error) {
      console.log(error);
    }
  };

  // return all methods we define in an object
  return {
    index,
    show,
  };
}
