import moment from 'moment';

export default function initSessionsController(db) {
  const index = async (request, response) => {
    try {
      await db.Item.findAll();
    } catch (error) {
      console.log(error);
    }
  };

  const createForm = async (request, response) => {
    try {
      const { id } = request.params;
      const course = await db.Course.findOne({ where: { id } });
      const instructors = await db.Instructor.findAll({ attributes: ['id'], include: { model: db.User, attributes: ['name'] } });
      const instructorArr = [];
      instructors.forEach((person) => {
        instructorArr.push({
          id: person.id,
          name: person.user.name,
        });
      });
      console.log(instructorArr);

      const adminList = [
        { id: 1, name: 'Yes' },
        { id: 2, name: 'No' },
      ];

      const formMeta = {
        title: `Add session for ${course.name}`,
        notes: 'If instructor is assigned later, leave blank',
        formAction: `/course/addSession/${id}`,
        method: 'post',
        submitVal: 'Add Session',
        cancelVal: 'Cancel',
        onCancel: `/course/${id}`,
        breadcrumbs: [
          { text: 'courses', href: '/courses' },
          { text: `${course.name}`, href: `/course/${id}` },
          { text: 'Add session', href: '' },
        ],
        fields: [
          {
            name: 'date',
            label: 'Date',
            type: 'date',
            placeholder: '',
            value: moment(course.endDatetime).add(1, 'days').format('YYYY-MM-DD'),
          },
          {
            name: 'startTime',
            label: 'Start time',
            type: 'time',
            placeholder: '',
            value: moment(course.startDatetime).format('HH:mm'),
          },
          {
            name: 'endTime',
            label: 'End time',
            type: 'time',
            placeholder: '',
            value: moment(course.endDatetime).format('HH:mm'),
          },
          {
            name: 'location',
            label: 'Location',
            type: 'text',
            placeholder: 'EAST, WEST, HBL',
            value: course.location,
          },
          {
            name: 'limit',
            label: 'Class Limit',
            type: 'number',
            placeholder: 'Max no. of students for session',
            value: course.limit,
          },
          {
            name: 'isChargeable',
            label: 'Chargeable?',
            type: 'select',
            options: adminList,
            placeholder: '',
            value: 'Yes',
          },
          {
            name: 'sessionType',
            label: 'Session Type',
            type: 'text',
            placeholder: 'Foundation / Practice / Test',
            value: '',
          },
          {
            name: 'instructor',
            label: 'Instructor',
            type: 'select',
            options: instructorArr,
            placeholder: '',
            value: course.instructor.instructor[0].name,
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

  const create = async (request, response) => {
    try {
      const formData = request.body;
      const { id } = request.params;
      console.log(formData);

      // Find course
      const course = await db.Course.findOne({ where: { id } });

      // update course info if needed
      if (moment(formData.date).isBefore(moment(course.startDatetime))) {
        await db.Course.update(
          {
            startDatetime: moment(formData.date).set({
              hour: moment(course.startDatetime).hours(),
              minute: moment(course.startDatetime).minutes(),
            }),
          },
          { where: { id } },
        );
      } else if (moment(formData.date).isAfter(moment(course.endDatetime))) {
        await db.Course.update(
          {
            endDatetime: moment(formData.date).set({
              hour: moment(course.endDatetime).hours(),
              minute: moment(course.endDatetime).minutes(),
            }),
          },
          { where: { id } },
        );
      }

      // Find instructor
      const instructorObj = { instructor: [] };
      if (formData.instructor !== '') {
        const instructor = await db.Instructor.findOne({ where: { id: formData.instructor }, include: { model: db.User, attributes: ['name'] } });
        if (instructor !== null) {
          instructorObj.instructor.push({
            id: formData.instructor,
            name: instructor.user.name,
          });
        }
      }

      // Create sessions
      const newSession = await course.createSession({
        startDatetime: moment(`${formData.date} ${formData.startTime}`),
        endDatetime: moment(`${formData.date} ${formData.endTime}`),
        location: formData.location,
        limit: formData.limit,
        isChargeable: formData.isChargeable === '1',
        sessionType: formData.sessionType,
        instructor: instructorObj,
      });

      // TO CREATE ASSIGNMENT FOR A GIVEN INSTRUCTOR

      response.redirect(`/course/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  // return all methods we define in an object
  return {
    index,
    createForm,
    create,
  };
}
