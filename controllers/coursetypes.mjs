import moment from 'moment';

export default function initCoursetypesController(db) {
  const index = async (request, response) => {
    try {
      const allCoursetypes = await db.Coursetype.findAll();
      // response.send(allCoursetypes);
      response.render('classes/coursetypes', { allCoursetypes });
    } catch (error) {
      console.log(error);
    }
  };

  const courseLevelIndex = async (request, response) => {
    try {
      // TO VERIFY
      const learningPathway = request.params;
      const levels = await db.Coursetype.findAll({
        where: { learningPathway },
        attributes: ['levels'],
      });
      const levelsArr = [];
      levels.forEach((item) => {
        if (!levelsArr.includes(item.level)) {
          levelsArr.push(item.level);
        }
      });
      response.send(levelsArr);
    } catch (error) {
      console.log(error);
    }
  };

  const createForm = async (request, response) => {
    try {
      const formMeta = {
        title: 'Create new course type',
        notes: '',
        formAction: '/coursetypes/new',
        method: 'post',
        submitVal: 'Submit',
        cancelVal: 'Cancel',
        onCancel: '/coursetypes',
        breadcrumbs: [
          { text: 'courses', href: '/courses' },
          { text: 'coursetypes', href: '/coursetypes' },
          { text: 'new coursetype', href: '' },
        ],
        fields: [
          {
            name: 'learningPathway',
            label: 'Learning Pathway',
            type: 'text',
            placeholder: 'E.g. EV3, WeDo, Arduino',
            value: '',
          },
          {
            name: 'level',
            label: 'Level',
            type: 'text',
            placeholder: 'E.g. Beginner Level 1',
            value: '',
          },
          {
            name: 'order',
            label: 'Order',
            type: 'number',
            placeholder: '0 if no order',
            value: '',
          },
        ],
      };
      response.render('partial/formTemplate', { form: formMeta });
    } catch (error) {
      console.log(error);
    }
  };

  const create = async (request, response) => {
    try {
      const formData = request.body;
      const newCourse = await db.Coursetype.create({
        learningPathway: formData.learningPathway,
        level: formData.level,
        order: formData.order,
      });
      response.redirect('/coursetypes');
    } catch (error) {
      console.log(error);
    }
  };

  const edit = async (request, response) => {
    try {
      const { id } = request.params;

      const learningPathway = await db.Coursetype.findOne({
        where: { id },
      });

      const formMeta = {
        title: 'Edit course type',
        notes: '',
        formAction: `/coursetypes/edit/${id}?_method=PUT`,
        method: 'post',
        submitVal: 'Update',
        cancelVal: 'Cancel',
        onCancel: '/coursetypes',
        breadcrumbs: [
          { text: 'courses', href: '/courses' },
          { text: 'coursetypes', href: '/coursetypes' },
          { text: 'edit coursetype', href: '' },
        ],
        fields: [
          {
            name: 'learningPathway',
            label: 'Learning Pathway',
            type: 'text',
            placeholder: 'E.g. EV3, WeDo, Arduino',
            value: learningPathway.learningPathway,
          },
          {
            name: 'level',
            label: 'Level',
            type: 'text',
            placeholder: 'E.g. Beginner Level 1',
            value: learningPathway.level,
          },
          {
            name: 'order',
            label: 'Order',
            type: 'number',
            placeholder: '0 if no order',
            value: learningPathway.order,
          },
        ],
      };
      // response.send(learningPathway);
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
      await db.Coursetype.update(
        {
          learningPathway: inData.learningPathway,
          level: inData.level,
          order: inData.order,
        },
        { where: { id } },
      );
      response.redirect('/coursetypes');
    } catch (error) {
      console.log(error);
    }
  };

  // return all methods we define in an object
  return {
    index,
    courseLevelIndex,
    createForm,
    create,
    edit,
    update,
  };
}
