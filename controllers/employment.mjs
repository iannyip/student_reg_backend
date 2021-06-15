export default function initEmploymentController(db) {
  const index = async (request, response) => {
    try {
      const allEmployment = await db.Employment.findAll();
      // response.send(allEmployment);
      response.render('people/employmenttypes', { allEmployment });
    } catch (error) {
      console.log(error);
    }
  };
  const createForm = async (request, response) => {
    try {
      const formMeta = {
        title: 'Create Employment Type',
        notes: 'An instructor has an employment type',
        formAction: '/employment/new',
        method: 'post',
        submitVal: 'Submit',
        cancelVal: 'Cancel',
        onCancel: '/employment',
        fields: [
          {
            name: 'type',
            label: 'Type',
            type: 'text',
            placeholder: 'Full Time/ Part Time',
            value: '',
          },
          {
            name: 'name',
            label: 'Name',
            type: 'text',
            placeholder: 'E.g. Assistant Trainer',
            value: '',
          },
          {
            name: 'rate',
            label: 'Rate',
            type: 'number',
            placeholder: '',
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
      const newEmployment = await db.Employment.create({
        type: formData.type,
        name: formData.name,
        rate: formData.rate,
      });
      response.redirect('/employment');
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
