import moment from 'moment';
import pkg from 'sequelize';

const { Op } = pkg;

export default function initInstructorsController(db) {
  const index = async (request, response) => {
    try {
      const year = moment().year();
      const month = moment().month() + 1;
      console.log(year, month);
      // navtabs
      const navtabs = [
        {
          text: 'All',
          link: '#',
          active: true,
        },
        {
          text: 'Current month',
          link: `/instructors/currentmth/${year}/${month}`,
          active: false,
        },
        {
          text: 'Unassigned courses',
          link: '/instructors/unassigned',
          active: false,
        },
      ];
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
        instructor.dataValues.hours = sumHours.toFixed(2);
      });
      // response.send(allInstructors);
      response.render('people/instructors', { allInstructors, courses: '', navtabs });
    } catch (error) {
      console.log(error);
    }
  };

  const currMthIndex = async (request, response) => {
    try {
      const { year, month } = request.params;
      // navtabs
      const navtabs = [
        {
          text: 'All',
          link: '/instructors',
          active: false,
        },
        {
          text: 'Current month',
          link: '#',
          active: true,
        },
        {
          text: 'Unassigned courses',
          link: '/instructors/unassigned',
          active: false,
        },
      ];
      const thisMonth = moment().month(month - 1).year(year).date(1)
        .hour(0);
      const nextMonth = moment().month(month).year(year).date(1)
        .hour(0)
        .subtract(1, 'days');

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
            where: {
              startDatetime: {
                [Op.between]: [thisMonth.toDate(), nextMonth.toDate()],
              },
            },
          },
        ],
      });

      allInstructors.forEach((instructor) => {
        let sumHours = 0;
        instructor.sessions.forEach((session) => {
          const duration = moment(session.endDatetime).diff(moment(session.startDatetime), 'hours', true);
          sumHours += duration;
        });
        instructor.dataValues.hours = sumHours.toFixed(2);
      });
      // response.send(allInstructors);
      response.render('people/instructors', { allInstructors, courses: '', navtabs });
    } catch (error) {
      console.log(error);
    }
  };

  const unassigned = async (request, response) => {
    try {
      const year = moment().year();
      const month = moment().month() + 1;
      const today = moment();
      // navtabs
      const navtabs = [
        {
          text: 'All',
          link: '/instructors',
          active: false,
        },
        {
          text: 'Current month',
          link: `/instructors/currentmth/${year}/${month}`,
          active: false,
        },
        {
          text: 'Unassigned courses',
          link: '#',
          active: true,
        },
      ];

      // Find all courses
      const courses = await db.Course.findAll({
        include: [{
          model: db.Signup,
        }, {
          model: db.Session,
          include: [
            { model: db.Attendance, attributes: ['id'] },
            { model: db.Assignment, attributes: ['id'] },
          ],
          where:
          {
            startDatetime: {
              [Op.gte]: today.toDate(),
            },
          },
        }],

      });

      const unassigned = [];
      courses.forEach((course) => {
        let UnassignedCount = 0;
        course.sessions.forEach((sess) => {
          if (sess.attendances.length > 0 && sess.assignments.length === 0) {
            UnassignedCount += 1;
          }
        });
        course.dataValues.unassignedCount = UnassignedCount;
      });

      // response.send(courses);
      response.render('people/instructors', {
        allInstructors: '', courses, navtabs, moment,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const show = async (request, response) => {
    try {
      const { id } = request.params;

      const instructor = await db.Instructor.findOne({
        where: { id },
        include: [
          db.Employment,
          {
            model: db.User,
            attributes: ['id', 'name', 'mobile', 'email', 'isAdmin'],
          },
          {
            model: db.Session,
            attributes: ['id', 'startDatetime', 'endDatetime', 'location', 'courseId', 'sessionType'],
            include: {
              model: db.Course,
              attributes: ['id', 'name'],
            },
          },
        ],
      });

      instructor.sessions.forEach((session) => {
        const duration = moment(session.endDatetime).diff(moment(session.startDatetime), 'hours', true);
        session.dataValues.formattedDate = moment(session.startDatetime).format('DD MMM YYYY');
        session.dataValues.duration = duration.toFixed(2);
      });
      // response.send(instructor);
      response.render('people/instructor', { instructor, moment });
    } catch (error) {
      console.log(error);
    }
  };

  const createForm = async (request, response) => {
    try {
      const employments = await db.Employment.findAll({ attributes: ['id', 'type', 'name'] });
      const empOptionsList = [];
      employments.forEach((emp) => {
        empOptionsList.push({
          id: emp.id,
          name: `${emp.type} - ${emp.name}`,
        });
      });
      const adminList = [
        { id: 1, name: 'Yes' },
        { id: 2, name: 'No' },
      ];
      const formMeta = {
        title: 'Create new instructor',
        notes: '',
        formAction: '/instructors/new',
        method: 'post',
        submitVal: 'Submit',
        cancelVal: 'Cancel',
        onCancel: '/instructors',
        breadcrumbs: [
          { text: 'instructors', href: '/instructors' },
          { text: 'new instructor', href: '' },
        ],
        fields: [
          {
            name: 'name',
            label: 'Name',
            type: 'text',
            placeholder: '',
            value: '',
          },
          {
            name: 'mobile',
            label: 'Mobile',
            type: 'text',
            placeholder: '',
            value: '',
          },
          {
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: '',
            value: '',
          },
          {
            name: 'isAdmin',
            label: 'Admin Access?',
            type: 'select',
            options: adminList,
            placeholder: '',
            value: '',
          },
          {
            name: 'rateId',
            label: 'Employment Type',
            type: 'select',
            options: empOptionsList,
            placeholder: '',
            value: '',
          },
          {
            name: 'additionalInfo',
            label: 'Additional Information',
            type: 'text',
            placeholder: 'Any special things we should know',
            value: '',
          },
        ],
      };
      // response.send(formMeta);
      response.render('partial/formTemplate', { form: formMeta });
    } catch (error) {
      console.log(error);
    }
  };

  const create = async (request, response) => {
    try {
      const formData = request.body;
      const newUser = await db.User.create({
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        isAdmin: (Number(formData.isAdmin) === 1),
        isParent: false,
      });
      const newInstructor = await newUser.createInstructor({
        rateId: formData.rateId,
        additionalInfo: formData.additionalInfo,
      });
      response.redirect(`/instructor/${newInstructor.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const edit = async (request, response) => {
    try {
      const { id } = request.params;
      const instructor = await db.Instructor.findOne({
        where: { id },
        include: [
          { model: db.User, attributes: ['name', 'mobile', 'email', 'isAdmin'] },
          { model: db.Employment, attributes: ['type', 'name'] },
        ],
      });
      const employments = await db.Employment.findAll({ attributes: ['id', 'type', 'name'] });
      const empOptionsList = [];
      employments.forEach((emp) => {
        empOptionsList.push({
          id: emp.id,
          name: `${emp.type} - ${emp.name}`,
        });
      });
      const adminList = [
        { id: 1, name: 'Yes' },
        { id: 2, name: 'No' },
      ];

      const formMeta = {
        title: `Edit Instructor: ${instructor.user.name}`,
        notes: '',
        formAction: `/instructor/edit/${id}?_method=PUT`,
        method: 'post',
        submitVal: 'Update',
        cancelVal: 'Cancel',
        onCancel: `/instructor/${id}`,
        breadcrumbs: [
          { text: 'instructors', href: '/instructors' },
          { text: `${instructor.user.name}`, href: `/instructor/${id}` },
          { text: 'edit', href: '' },
        ],
        fields: [
          {
            name: 'name',
            label: 'Name',
            type: 'text',
            placeholder: 'Full Name',
            value: instructor.user.name,
          },
          {
            name: 'mobile',
            label: 'Mobile',
            type: 'text',
            placeholder: 'Mobile',
            value: instructor.user.mobile,
          },
          {
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'Email',
            value: instructor.user.email,
          },
          {
            name: 'isAdmin',
            label: 'Admin Access?',
            type: 'select',
            options: adminList,
            placeholder: '',
            value: (instructor.user.isAdmin ? 'Yes' : 'No'),
          },
          {
            name: 'rateId',
            label: 'Employment Type',
            type: 'select',
            options: empOptionsList,
            placeholder: '',
            value: `${instructor.employment.type} - ${instructor.employment.name}`,
          },
          {
            name: 'additionalInfo',
            label: 'Additional Information',
            type: 'text',
            placeholder: 'Any special things we should know',
            value: instructor.additionalInfo,
          },
        ],
      };
      // response.send(instructor);
      // response.send(formMeta);
      response.render('partial/formTemplate', { form: formMeta });
    } catch (error) {
      console.log(error);
    }
  };

  const update = async (request, response) => {
    try {
      const { id } = request.params;
      const inData = request.body;

      await db.Instructor.update(
        {
          rateId: inData.rateId,
          additionalInfo: inData.additionalInfo,
        },
        { where: { id } },
      );
      const updatedInstructor = await db.Instructor.findOne({
        where: { id },
        include: db.User,
      });

      await db.User.update(
        {
          name: inData.name,
          mobile: inData.mobile,
          email: inData.email,
          isAdmin: (Number(inData.isAdmin) === 1),
        },
        { where: { id: updatedInstructor.user.id } },
      );

      response.redirect(`/instructor/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  // return all methods we define in an object
  return {
    index,
    currMthIndex,
    unassigned,
    show,
    createForm,
    create,
    edit,
    update,
  };
}
