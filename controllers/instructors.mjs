import moment from 'moment';

export default function initInstructorsController(db) {
  const index = async (request, response) => {
    try {
      const allInstructors = await db.Instructor.findAll({
        include: [
          {
            model: db.User,
            attributes: ['id', 'name', 'mobile'],
          },
          db.Employment,
          {
            model: db.Session,
            // add where filter for current month
            attributes: ['startDatetime', 'endDatetime'],
            through: { model: db.Assignment, attributes: [] },
          },
        ],
      });

      allInstructors.forEach((instructor) => {
        let sumHours = 0;
        instructor.sessions.forEach((session) => {
          const duration = moment(session.endDatetime).diff(moment(session.startDatetime), 'hours', true);
          sumHours += duration;
        });
        instructor.dataValues.hours = sumHours;
      });
      // response.send(allInstructors);
      response.render('people/instructors', { allInstructors });
    } catch (error) {
      console.log(error);
    }
  };

  // return all methods we define in an object
  return {
    index,
  };
}
