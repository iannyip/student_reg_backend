import moment from 'moment';

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
          include: [db.Instructor],
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
