import moment from 'moment';
// import { Sequelize } from 'sequelize';
const splitTime = (timestring) => {
  const hours = timestring.substring(0, 2);
  const min = timestring.substring(3, 5);
  return [hours, min];
};

export default function initCoursesController(db) {
  const index = async (request, response) => {
    try {
      // Check if user is auth
      if (request.isUserLoggedIn === false) {
        console.log('not  good at all');
        response.redirect('/login');
      }
      // navtabs
      const navtabs = [
        {
          text: 'All',
          link: '#',
          active: true,
        },
        {
          text: 'Upcoming',
          link: '#',
          active: false,
        },
        {
          text: 'Past',
          link: '#',
          active: false,
        },
      ];

      // Get array of pathways for create course dropdown
      const pathways = await db.Coursetype.findAll({
        attributes: ['learningPathway'],
      });
      const pathwaysArr = [];
      pathways.forEach((item) => {
        if (!pathwaysArr.includes(item.learningPathway)) {
          pathwaysArr.push(item.learningPathway);
        }
      });

      // Find a list of all courses and their relevant info
      const allCourses = await db.Course.findAll({
        attributes: [
          'id',
          'name',
          'startDatetime',
          'endDatetime',
          'location',
          'limit',
          'instructor',
        ],
        include: [
          {
            // 1st table: coursetypes
            model: db.Coursetype,
            attributes: ['learningPathway', 'level'],
          },
          {
            // 2nd table: signups
            model: db.Signup,
            attributes: ['id'],
          },
        ],
      });
      // response.send(allCourses);
      response.render('classes/courses', {
        allCourses, pathwaysArr, moment, navtabs,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const indexUpcoming = async (request, response) => {
    try {
      // Check if user is auth
      if (request.isUserLoggedIn === false) {
        console.log('not  good at all');
        response.redirect('/login');
      }
      // navtabs
      const navtabs = [
        {
          text: 'All',
          link: '#',
          active: true,
        },
        {
          text: 'Upcoming',
          link: '/courses/upcoming',
          active: false,
        },
        {
          text: 'Past',
          link: '#',
          active: false,
        },
      ];

      // Get array of pathways for create course dropdown
      const pathways = await db.Coursetype.findAll({
        attributes: ['learningPathway'],
      });
      const pathwaysArr = [];
      pathways.forEach((item) => {
        if (!pathwaysArr.includes(item.learningPathway)) {
          pathwaysArr.push(item.learningPathway);
        }
      });

      // Find a list of all courses and their relevant info
      const allCourses = await db.Course.findAll({
        attributes: [
          'id',
          'name',
          'startDatetime',
          'endDatetime',
          'location',
          'limit',
          'instructor',
        ],
        include: [
          {
            // 1st table: coursetypes
            model: db.Coursetype,
            attributes: ['learningPathway', 'level'],
          },
          {
            // 2nd table: signups
            model: db.Signup,
            attributes: ['id'],
          },
        ],
      });
      // response.send(allCourses);
      response.render('classes/courses', {
        allCourses, pathwaysArr, moment, navtabs,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const indexPast = async (request, response) => {
    try {
      // Check if user is auth
      if (request.isUserLoggedIn === false) {
        console.log('not  good at all');
        response.redirect('/login');
      }
      // navtabs
      const navtabs = [
        {
          text: 'All',
          link: '#',
          active: true,
        },
        {
          text: 'Upcoming',
          link: '/courses/upcoming',
          active: false,
        },
        {
          text: 'Past',
          link: '#',
          active: false,
        },
      ];

      // Get array of pathways for create course dropdown
      const pathways = await db.Coursetype.findAll({
        attributes: ['learningPathway'],
      });
      const pathwaysArr = [];
      pathways.forEach((item) => {
        if (!pathwaysArr.includes(item.learningPathway)) {
          pathwaysArr.push(item.learningPathway);
        }
      });

      // Find a list of all courses and their relevant info
      const allCourses = await db.Course.findAll({
        attributes: [
          'id',
          'name',
          'startDatetime',
          'endDatetime',
          'location',
          'limit',
          'instructor',
        ],
        include: [
          {
            // 1st table: coursetypes
            model: db.Coursetype,
            attributes: ['learningPathway', 'level'],
          },
          {
            // 2nd table: signups
            model: db.Signup,
            attributes: ['id'],
          },
        ],
      });
      // response.send(allCourses);
      response.render('classes/courses', {
        allCourses, pathwaysArr, moment, navtabs,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const show = async (request, response) => {
    try {
      const { id } = request.params;
      const course = await db.Course.findOne({
        where: { id },
        include: [
          db.Coursetype,
          {
            model: db.Session,
            include: {
              model: db.Student,
              attributes: ['id', 'name'],
              through: {
                attributes: [],
              },
            },
          },
        ],
      });
      // response.send(course);
      response.render('classes/course', { course, moment });
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

  const createForm = async (request, response) => {
    try {
      const { pathwayName } = request.params;
      const pathLevels = await db.Coursetype.findAll({
        where: { learningPathway: pathwayName },
        attributes: ['level'],
      });
      const levelArr = [];
      pathLevels.forEach((item) => {
        if (!levelArr.includes(item.level)) {
          levelArr.push(item.level);
        }
      });
      const formMeta = {
        title: `Create new ${pathwayName} course`,
        notes: '',
        formAction: '/courses/new',
        method: 'post',
        learningPathway: pathwayName,
        submitVal: 'Submit',
        cancelVal: 'Cancel',
        onCancel: '/coursetypes',
        breadcrumbs: [
          { text: 'courses', href: '/courses' },
          { text: `new ${pathwayName} course`, href: '' },
        ],
        fields: [
          {
            name: 'level',
            label: 'Level',
            type: 'select',
            placeholder: 'Select from dropdown',
            options: levelArr,
            value: '',
          },
          {
            name: 'name',
            label: 'Name',
            type: 'text',
            placeholder: 'user chooses level',
            value: '',
          },
          {
            name: 'location',
            label: 'Location',
            type: 'text',
            placeholder: 'EAST, WEST, HBL',
            value: '',
          },
          {
            name: 'limit',
            label: 'Class Limit',
            type: 'number',
            placeholder: 'Maximum of students per session',
            value: '',
          },
        ],
      };
      response.render('classes/newCourseForm', { form: formMeta });
    } catch (error) {
      console.log(error);
    }
  };

  const create = async (request, response) => {
    try {
      const formData = request.body;
      const sessionFieldNameArr = [
        'no',
        'date',
        'startTime',
        'endTime',
        'limit',
        'isChargeable',
        'sessionType',
      ];

      const sessionsArr = [];
      for (let i = 0; i < formData.sessionsno.length; i += 1) {
        const tempObj = {};
        sessionFieldNameArr.forEach((field) => {
          tempObj[`${field}`] = formData[`sessions${field}`][i];
        });
        tempObj.startDatetime = moment(`${tempObj.date} ${tempObj.startTime}`);
        tempObj.endDatetime = moment(`${tempObj.date} ${tempObj.endTime}`);
        sessionsArr.push(tempObj);
      }

      // Get first and last date
      const courseStart = moment.min(
        formData.sessionsdate.map((x) => moment(x)),
      );
      const courseEnd = moment.max(formData.sessionsdate.map((x) => moment(x)));

      // Make array of start and end times
      // if unique, assign to start and end
      const distinctStartTime = [
        ...new Set(formData.sessionsstartTime.map((x) => x)),
      ];
      const distinctEndTime = [
        ...new Set(formData.sessionsendTime.map((x) => x)),
      ];
      if (distinctStartTime.length === 1 && distinctEndTime.length === 1) {
        courseStart.hours(splitTime(distinctStartTime[0])[0]);
        courseStart.minutes(splitTime(distinctStartTime[0])[1]);
        courseEnd.hours(splitTime(distinctEndTime[0])[0]);
        courseEnd.minutes(splitTime(distinctEndTime[0])[1]);
      }

      // Create blank obj for instructor columns
      const instructorObj = { instructor: [] };

      // Find out which coursetype
      const coursetype = await db.Coursetype.findOne({
        where: {
          learningPathway: formData.learningPathway,
          level: formData.level,
        },
      });
      // Create course
      const newCourse = await coursetype.createCourse({
        name: formData.name,
        startDatetime: courseStart.toDate(),
        endDatetime: courseEnd.toDate(),
        location: formData.location,
        limit: formData.limit,
        instructor: instructorObj,
      });

      // Create sessions
      sessionsArr.forEach(async (session) => {
        const newSession = await newCourse.createSession({
          startDatetime: session.startDatetime,
          endDatetime: session.endDatetime,
          location: 'EAST',
          limit: session.limit,
          isChargeable: session.isChargeable === 'on',
          sessionType: session.sessionType,
          instructor: instructorObj,
        });
      });
      // response.send(200);
      response.redirect(`/course/${newCourse.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const registerForm = async (request, response) => {
    try {
      const { id } = request.params;
      console.log(`registering for ${id}`);
      const courseInfo = await db.Course.findOne({ where: { id } });
      const allStudents = await db.Student.findAll({
        include: {
          model: db.User,
          attributes: ['name'],
        },
      });
      const studentList = [];
      allStudents.forEach((student) => {
        studentList.push({
          id: student.id,
          name: `${student.name} (${student.user.name})`,
        });
      });
      const formMeta = {
        title: 'Register student',
        notes: '',
        formAction: `/course/register/${id}`,
        method: 'post',
        submitVal: 'Register',
        cancelVal: 'Cancel',
        onCancel: `/course/${id}`,
        breadcrumbs: [
          { text: 'courses', href: '/students' },
          { text: `${courseInfo.name}`, href: `/course/${id}` },
          { text: 'register', href: '#' },
        ],
        fields: [
          {
            name: 'courseName',
            label: 'Course',
            type: 'text',
            placeholder: '',
            value: courseInfo.name,
            readonly: true,
          },
          {
            name: 'date',
            label: 'Dates',
            type: 'text',
            placeholder: '',
            value: `${moment(courseInfo.startDatetime).format(
              'DD/MM/YYYY',
            )} to ${moment(courseInfo.endDatetime).format('DD/MM/YYYY')}`,
            readonly: true,
          },
          {
            name: 'time',
            label: 'Time',
            type: 'text',
            placeholder: '',
            value: `${moment(courseInfo.startDatetime).format(
              'HH:MM',
            )} to ${moment(courseInfo.endDatetime).format('HH:MM')}`,
            readonly: true,
          },
          {
            name: 'location',
            label: 'Location',
            type: 'text',
            placeholder: '',
            value: courseInfo.location,
            readonly: true,
          },
          {
            name: 'student',
            label: 'Select student',
            type: 'select',
            options: studentList,
            placeholder: 'Select from dropdown',
            readonly: false,
          },
          {
            name: 'comments',
            label: 'Comment',
            type: 'text',
            placeholder: 'Any additional info',
            readonly: false,
          },
        ],
      };

      // response.send(formMeta);
      // response.send({ studentList, courseInfo });
      response.render('partial/formTemplate', { form: formMeta });
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (request, response) => {
    try {
      const { id } = request.params;
      const inData = request.body;
      console.log(id);
      console.log(inData);

      const course = await db.Course.findOne({
        where: { id },
        include: db.Session,
      });
      console.log(course);
      // Create a new signup in signups table
      const newSignup = await course.createSignup({
        studentId: inData.student,
        comments: '',
        status: 'registered',
      });
      // Create a new attendance in attendances table
      for (const session of course.sessions) {
        await db.Attendance.create({
          sessionId: session.id,
          studentId: inData.student,
          comments: '',
          marked: false,
          status: 'registered',
        });
      }

      response.redirect(`/course/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  // return all methods we define in an object
  return {
    index,
    indexUpcoming,
    indexPast,
    show,
    dashboard,
    createForm,
    create,
    registerForm,
    register,
  };
}
