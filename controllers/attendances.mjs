import moment from 'moment';

export default function initAttendancesController(db) {
  const index = async (request, response) => {
    try {
      await db.Item.findAll();
    } catch (error) {
      console.log(error);
    }
  };

  const pmtForm = async (request, response) => {
    try {
      const { id } = request.params;

      // Find all credits associated parent of student
      const attendanceStudent = await db.Attendance.findOne({
        where: { id },
        include: [
          {
            model: db.Student,
            include: {
              model: db.User,
              attributes: ['id'],
              include: {
                model: db.Credit,
                include: db.Attendance,
              },
            },
          },
        ],

      });

      // Find items associated with course
      const attendanceCourse = await db.Attendance.findOne({
        where: { id },
        include: {
          model: db.Session,
          attributes: ['id', 'startDatetime'],
          include: {
            model: db.Course,
            attributes: ['id', 'name'],
            include: {
              model: db.Coursetype,
              attributes: ['id', 'learningPathway'],
              include: db.Item,
            },
          },
        },
      });

      // Create list of valid credits
      const validItemIdArr = attendanceCourse.session.course.coursetype.items.map((item) => item.id);
      const validCredits = [];
      attendanceStudent.student.user.credits.forEach((credit) => {
        if (validItemIdArr.includes(credit.itemId)) {
          validCredits.push(credit);
        }
      });

      // Format list of valid credits for form
      const validCreditsOptions = [];
      validCredits.forEach((credit) => {
        const sessionsUsed = credit.attendances.length;
        if (sessionsUsed < credit.creditTotal) {
          validCreditsOptions.push({
            id: credit.id,
            name: `${credit.code} (${sessionsUsed}/${credit.creditTotal})`,
          });
        }
      });

      const formMeta = {
        title: 'Assign payment package',
        notes: '',
        formAction: `/attendance/payment/${id}?_method=PUT`,
        method: 'post',
        submitVal: 'Add payment',
        cancelVal: 'Cancel',
        onCancel: `/session/${attendanceCourse.sessionId}`,
        breadcrumbs: [
          { text: 'courses', href: '/instructors' },
          { text: `${attendanceCourse.session.course.name}`, href: `/course/${attendanceCourse.session.course.id}` },
          { text: `session ${moment(attendanceCourse.session.startDatetime).format('DD/MM/YYYY')}`, href: `/session/${attendanceCourse.sessionId}` },
          { text: `${attendanceStudent.student.name}`, href: `/student/${attendanceStudent.student.id}` },
          { text: 'add payment', href: '' },
        ],
        fields: [
          {
            name: 'course',
            label: 'Course',
            type: 'text',
            placeholder: '',
            value: attendanceCourse.session.course.name,
            readonly: true,
          },
          {
            name: 'session',
            label: 'Session',
            type: 'text',
            placeholder: '',
            value: moment(attendanceCourse.session.startDatetime).format('DD/MM/YYYY'),
            readonly: true,
          },
          {
            name: 'student',
            label: 'Student',
            type: 'text',
            placeholder: '',
            value: attendanceStudent.student.name,
            readonly: true,
          },
          {
            name: 'credit',
            label: 'Credit',
            type: 'select',
            options: validCreditsOptions,
            placeholder: '',
            value: '',
          },
        ],
      };

      // response.send({
      //   attendanceStudent, attendanceCourse, validItemIdArr, validCredits, validCreditsOptions,
      // });
      response.render('partial/formTemplate', { form: formMeta });
    } catch (error) {
      console.log(error);
    }
  };

  const pmtUpdate = async (request, response) => {
    try {
      const { id } = request.params;
      const inData = request.body;
      console.log(inData);
      const attendance = await db.Attendance.findOne({ where: { id } });
      await db.Attendance.update(
        { payment: inData.credit },
        { where: { id } },
      );
      response.redirect(`/session/${attendance.sessionId}`);
    } catch (error) {
      console.log(error);
    }
  };

  // return all methods we define in an object
  return {
    index,
    pmtForm,
    pmtUpdate,
  };
}
