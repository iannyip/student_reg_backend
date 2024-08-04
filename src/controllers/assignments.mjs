import moment from 'moment';

export default function initAssignmentsController(db) {
  const index = async (request, response) => {
    try {
      await db.Item.findAll();
    } catch (error) {
      console.log(error);
    }
  };
  const courseIntForm = async (request, response) => {
    try {
      const { courseId } = request.params;
      console.log(courseId);

      const course = await db.Course.findOne({ where: { id: courseId } });

      const instructors = await db.Instructor.findAll({
        include: {
          model: db.User,
          attributes: ['id', 'name'],
        },
      });
      const instructorArr = [];
      instructors.forEach((person) => {
        instructorArr.push({
          id: person.id,
          name: person.user.name,
        });
      });

      const formMeta = {
        title: `Add instructor for ${course.name}`,
        notes: 'Note: Instructor will be assigned to all sessions in course',
        formAction: `/assignment/new/${courseId}`,
        method: 'post',
        submitVal: 'Assign Instructor',
        cancelVal: 'Cancel',
        onCancel: `/course/${courseId}`,
        breadcrumbs: [
          { text: 'courses', href: '/courses' },
          { text: `${course.name}`, href: `/course/${courseId}` },
          { text: 'Add instructor', href: '' },
        ],
        fields: [
          {
            name: 'course',
            label: 'Course',
            type: 'text',
            placeholder: '',
            value: course.name,
            readonly: true,
          },
          {
            name: 'date',
            label: 'Date',
            type: 'text',
            placeholder: '',
            value: `${moment(course.startDatetime).format(
              'D MMM YYYY'
            )} to ${moment(course.endDatetime).format('D MMM YYYY')}`,
            readonly: true,
          },
          {
            name: 'time',
            label: 'Time',
            type: 'text',
            placeholder: '',
            value: `${moment(course.startDatetime).format('HH:mm')} to ${moment(
              course.endDatetime
            ).format('HH:mm')}`,
            readonly: true,
          },
          {
            name: 'location',
            label: 'Location',
            type: 'text',
            placeholder: 'EAST, WEST, HBL',
            value: course.location,
            readonly: true,
          },
          {
            name: 'instructor',
            label: 'Instructor',
            type: 'select',
            options: instructorArr,
            placeholder: '',
            value: '',
          },
          {
            name: 'role',
            label: 'Role',
            type: 'text',
            placeholder: 'Main / Assist',
            value: '',
          },
        ],
      };
      // response.send(course);
      // response.send(formMeta);
      response.render('partial/formTemplate', { form: formMeta });
    } catch (error) {
      console.log(error);
    }
  };

  const courseIntCreate = async (request, response) => {
    try {
      const { courseId } = request.params;
      const inData = request.body;
      const instructorId = request.body.instructor;

      // Step 1: Find course and corresponding sessions
      const course = await db.Course.findOne({
        where: { id: courseId },
        include: {
          model: db.Session,
          include: {
            model: db.Instructor,
            attributes: ['id'],
            through: {
              model: db.Assignment,
              attributes: ['role'],
            },
            include: {
              model: db.User,
              attributes: ['name'],
            },
          },
        },
      });
      const instructor = await db.Instructor.findOne({
        where: { id: instructorId },
        include: [
          {
            model: db.User,
            attributes: ['id', 'name'],
          },
          {
            model: db.Employment,
            attributes: ['rate'],
          },
        ],
      });
      const newInstObj = {
        id: instructor.id,
        name: instructor.user.name,
        role: inData.role,
      };
      const courseInstructorsArr = [];

      // Step 2: For each session, create new assignment and update only if not yet assigned
      course.sessions.forEach(async (session) => {
        console.log(`Session: ${session.id}`);
        const sessionInstructorArr = [];
        const currentInsIdArr = session.instructors.map((ins) => ins.id);

        // Step 2A: Re-create the instructor object from existing instructors
        session.instructors.forEach((ins) => {
          const instObj = {
            id: ins.id,
            name: ins.user.name,
            role: ins.assignment.role,
          };
          if (!sessionInstructorArr.map((x) => x.id).includes(instObj.id)) {
            sessionInstructorArr.push(instObj);
          }
          if (!courseInstructorsArr.map((x) => x.id).includes(instObj.id)) {
            courseInstructorsArr.push(instObj);
          }
        });

        // Step 2B: Check if need to new assignment
        if (!currentInsIdArr.includes(Number(instructorId))) {
          console.log(
            `instructor ${instructorId} is not in ${currentInsIdArr}. To update`
          );
          // Add new instructor
          sessionInstructorArr.push(newInstObj);

          // Create new assignment
          await db.Assignment.create({
            sessionId: session.id,
            instructorId,
            rate: instructor.employment.rate,
            role: inData.role,
          });
        }

        // Step 2C: Update the session (regardless of new assignment/not)
        console.log(`updating session ${newInstObj.id}`);
        console.log('with: ', sessionInstructorArr);
        await db.Session.update(
          { instructor: { instructor: sessionInstructorArr } },
          { where: { id: session.id } }
        );
      });

      // Step 3: Update course
      console.log('courseInstructorsArr: ', courseInstructorsArr);
      if (!courseInstructorsArr.map((x) => x.id).includes(newInstObj.id)) {
        courseInstructorsArr.push(newInstObj);
      }
      await db.Course.update(
        { instructor: { instructor: courseInstructorsArr } },
        { where: { id: courseId } }
      );

      // response.send({ newInstObj, instructor, course });
      response.redirect(`/course/${courseId}`);
    } catch (error) {
      console.log(error);
    }
  };

  // return all methods we define in an object
  return {
    index,
    courseIntForm,
    courseIntCreate,
  };
}
