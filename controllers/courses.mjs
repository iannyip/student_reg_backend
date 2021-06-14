import moment from 'moment';
// import { Sequelize } from 'sequelize';

export default function initCoursesController(db) {
  const index = async (request, response) => {
    try {
      const allCourses = await db.Course.findAll({
        attributes: ['startDatetime', 'endDatetime', 'location', 'limit'],
        include: [{
          model: db.Coursetype,
          attributes: ['learningPathway', 'level'],
        }, {
          model: db.Session,
          attributes: ['id'],
          include: [{
            model: db.Instructor,
            attributes: ['id'],
            through: { attributes: [] }, // this excludes the through table
            include: {
              model: db.User,
              attributes: ['name'],
            },
          },
          {
            model: db.Attendance,
            attributes: [[db.sequelize.fn('COUNT', db.sequelize.col('student_id')), 'n_students']],
          }],
        }],
      });
      response.send(allCourses);
      // response.render('classes/courses', { allCourses, moment });
    } catch (error) {
      console.log(error);
    }
  };

  // return all methods we define in an object
  return {
    index,
  };
}
