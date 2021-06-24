import db from './models/index.mjs';

const updateInsCols = async () => {
  try {
    // STEP 1: QUERY COURSES, SESSIONS, and assoc instructors
    const courses = await db.Course.findAll({
      attributes: ['id', 'instructor'],
      include: {
        model: db.Session,
        attributes: ['id', 'instructor'],
        include: {
          model: db.Assignment,
          attributes: ['instructorId', 'role'],
          include: {
            model: db.Instructor,
            attributes: ['id'],
            include: {
              model: db.User,
              attributes: ['name'],
            },
          },
        },
      },
    });
      // STEP 2: Create array of course obj, which contains arr of sess objs
    const allCourseAssArr = [];
    courses.forEach((course) => {
      const courseAssArr = [];
      const courseInstArr = [];
      course.sessions.forEach((session) => {
        const sessAssArr = [];
        session.assignments.forEach((ass) => {
          const assObj = {
            id: ass.instructorId,
            name: ass.instructor.user.name,
            role: ass.role,
          };
          sessAssArr.push(assObj);
          if (!courseInstArr.map((x) => x.id).includes(assObj.id)) {
            courseInstArr.push(assObj);
          }
        });
        courseAssArr.push({
          sessionId: session.id,
          sessionAss: sessAssArr,
        });
      });
      allCourseAssArr.push({
        courseId: course.id,
        courseAss: courseInstArr,
        sessions: courseAssArr,
      });
    });
    // STEP 3: Update database
    allCourseAssArr.forEach(async (course) => {
      await db.Course.update(
        { instructor: { instructor: course.courseAss } },
        { where: { id: course.courseId } },
      );
      course.sessions.forEach(async (session) => {
        await db.Session.update(
          { instructor: { instructor: session.sessionAss } },
          { where: { id: session.sessionId } },
        );
      });
    });
  } catch (error) {
    console.log(error);
  }
};

updateInsCols();
