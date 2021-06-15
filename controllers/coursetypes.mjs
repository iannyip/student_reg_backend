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

  const createForm = async (request, response) => {
    try {
      console.log('request came in');
      const formMeta = {
        title: 'Create new course type',
        formAction: '/coursetypes/new',
        method: 'post',
        submitVal: 'Submit',
        onCancel: '/coursetypes',
        fields: [
          {
            name: 'learningPathway',
            label: 'Learning Pathway',
            type: 'text',
            placeholder: 'E.g. EV3, WeDo, Arduino',
          },
          {
            name: 'level',
            label: 'Level',
            type: 'text',
            placeholder: 'E.g. Beginner Level 1',
          },
          {
            name: 'order',
            label: 'Order',
            type: 'number',
            placeholder: '0 if no order',
          },
        ],
      };
      response.render('classes/newCoursetypeForm', { formMeta });
    } catch (error) {
      console.log(error);
    }
  };

  const create = async (request, response) => {
    try {
      console.log('post request received');
      console.log('request.body: ', request.body);
      response.redirect('/coursetypes');
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
