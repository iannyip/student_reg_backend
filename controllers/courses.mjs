import moment from 'moment';
// import { Sequelize } from 'sequelize';

export default function initCoursesController(db) {
  const index = async (request, response) => {
    try {
      const pathways = await db.Coursetype.findAll({
        attributes: ['learningPathway'],
      });
      const pathwaysArr = [];
      pathways.forEach((item) => {
        if (!pathwaysArr.includes(item.learningPathway)) {
          pathwaysArr.push(item.learningPathway);
        }
      });
      console.log(pathwaysArr);
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
      response.render('classes/courses', { allCourses, pathwaysArr, moment });
    } catch (error) {
      console.log(error);
    }
  };

  const show = async (request, response) => {
    try {
      const { id } = request.params;
      console.log(id);
      const course = await db.Course.findOne({
        where: { id },
        include: [
          db.Coursetype,
          {
            model: db.Session,
            include: db.Student,
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
          levelArr.push(
            item.level,
          );
        }
      });
      const formMeta = {
        title: `Create new ${pathwayName} course`,
        notes: '',
        formAction: '/coursetypes/new',
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
      response.render('classes/courses', { allCourses, moment });
    } catch (error) {
      console.log(error);
    }
  };

  // return all methods we define in an object
  return {
    index,
    show,
    dashboard,
    createForm,
    create,
  };
}
