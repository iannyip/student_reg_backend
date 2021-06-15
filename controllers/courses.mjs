import moment from 'moment';
// import { Sequelize } from 'sequelize';

export default function initCoursesController(db) {
  const index = async (request, response) => {
    try {
      const allCourses = await db.Course.findAll({
        attributes: ['id', 'name', 'startDatetime', 'endDatetime', 'location', 'limit'],
        include: [
          {
            // 1st table: coursetypes
            model: db.Coursetype,
            attributes: ['learningPathway', 'level'],
          },
          {
            // 2nd table: sessions
            model: db.Session,
            attributes: ['id'],
            include: {
              model: db.Instructor,
              attributes: ['id'],
              through: { attributes: [] }, // this excludes the through table
              include: {
                model: db.User,
                attributes: ['name'],
              },
            },
          },
          {
            // 3rd table: signups
            model: db.Signup,
            attributes: ['id'],
          },
        ],
      });
      // response.send(allCourses);
      response.render('classes/courses', { allCourses, moment });
    } catch (error) {
      console.log(error);
    }
  };

  const dashboard = async (request, response) => {
    try {
      response.render('classes/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  // return all methods we define in an object
  return {
    index,
    dashboard,
  };
}
