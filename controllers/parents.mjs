import moment from 'moment';

export default function initParentsController(db) {
  const index = async (request, response) => {
    try {
      const allParents = await db.Parents.findAll();
      response.send(allParents);
    } catch (error) {
      console.log(error);
    }
  };

  const show = async (request, response) => {
    try {
      const { id } = request.params;
      const parent = await db.User.findOne({
        where: { id },
        include: [
          { model: db.Parent },
          {
            model: db.Student,
            include: {
              model: db.Course,
              include: db.Coursetype,
            },
          },
          {
            model: db.Credit,
            include: db.Attendance,
          },
        ],
      });

      parent.students.forEach((student) => {
        const learningpathwaysArr = [];
        student.courses.forEach((course) => {
          if (!learningpathwaysArr.includes(course.coursetype.learningPathway)) {
            learningpathwaysArr.push(course.coursetype.learningPathway);
          }
        });
        student.dataValues.learningPathways = learningpathwaysArr;
      });
      // response.send(parent);
      response.render('people/parent', { parent, moment });
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
