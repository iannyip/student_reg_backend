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
        breadcrumbs: [
          { text: 'instructors', href: '/instructors' },
          { text: 'employment', href: '/employment' },
          { text: 'new employment type', href: '' },
        ],
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
  const edit = async (request, response) => {
    try {
      const { id } = request.params;

      const employment = await db.Employment.findOne({
        where: { id },
      });

      const formMeta = {
        title: `Edit employment: ${employment.type} - ${employment.name}`,
        notes: 'Only future assignments will be affected by this change',
        formAction: `/employment/edit/${id}?_method=PUT`,
        method: 'post',
        submitVal: 'Update',
        cancelVal: 'Cancel',
        onCancel: '/employment',
        breadcrumbs: [
          { text: 'instructors', href: '/instructors' },
          { text: 'employment', href: '/employment' },
          { text: 'edit employment type', href: '' },
        ],
        fields: [
          {
            name: 'type',
            label: 'Type',
            type: 'text',
            placeholder: 'Full Time / Part Time',
            value: employment.type,
          },
          {
            name: 'name',
            label: 'name',
            type: 'text',
            placeholder: 'Scheme name',
            value: employment.name,
          },
          {
            name: 'rate',
            label: 'Rate',
            type: 'number',
            placeholder: '',
            value: employment.rate,
          },
        ],
      };
      // response.send(employment);
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
      await db.Employment.update(
        {
          type: inData.type,
          name: inData.name,
          rate: inData.rate,
        },
        { where: { id } },
      );
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
    edit,
    update,
  };
}
