import moment from 'moment';

export default function initCreditsController(db) {
  const index = async (request, response) => {
    try {
      const allCredits = await db.Credit.findAll({
        include: [{
          model: db.User,
          attributes: ['id', 'name'],
          include: { model: db.Parent, attributes: ['id'] },
        },
        {
          model: db.Attendance,
        }],
      });
      // response.send(allCredits);
      response.render('purchases/credits', { allCredits, moment });
    } catch (error) {
      console.log(error);
    }
  };

  const show = async (request, response) => {
    try {
      const { id } = request.params;
      const credit = await db.Credit.findOne({
        where: { id },
        include: [db.Session, { model: db.User, attributes: ['id', 'name'] }],
      });
      // response.send(credit);
      response.render('purchases/credit', { credit, moment });
    } catch (error) {
      console.log(error);
    }
  };

  const createForm = async (request, response) => {
    try {
      const today = moment(new Date()).add(2, 'years');
      const itemsList = await db.Item.findAll({
        attributes: ['id', 'name'],
      });
      const parentList = await db.User.findAll({
        where: { is_parent: true },
        attributes: ['id', 'name'],
      });
      const formMeta = {
        title: 'Create new package',
        notes: 'Packages can only be assigned to existing parents. Expires 2 years by default',
        formAction: '/credits/new',
        method: 'post',
        submitVal: 'Submit',
        cancelVal: 'Cancel',
        onCancel: '/credits',
        breadcrumbs: [
          { text: 'credits', href: '/credits' },
          { text: 'new credit purchase', href: '' },
        ],
        fields: [
          {
            name: 'code',
            label: 'Package Code',
            type: 'text',
            placeholder: 'Code',
            value: '',
          },
          {
            name: 'parentName',
            label: 'Parent Name',
            type: 'select',
            options: parentList,
            placeholder: 'Select from dropdown',
            value: '',
          },
          {
            name: 'packageType',
            label: 'Package Type',
            type: 'select',
            options: itemsList,
            placeholder: 'Select from dropdown',
            value: '',
          },
          {
            name: 'expiry',
            label: 'Expiry',
            type: 'date',
            placeholder: '',
            value: moment(today).format('YYYY-MM-DD'),
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
      const item = await db.Item.findOne({
        where: { id: formData.packageType },
      });
      const newCredit = await db.Credit.create({
        code: formData.code,
        parentId: formData.parentName,
        value: item.price,
        creditTotal: item.creditCount,
        expiry: formData.expiry,
        itemId: formData.packageType,
      });
      response.redirect(`/credit/${newCredit.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  // return all methods we define in an object
  return {
    index,
    show,
    createForm,
    create,
  };
}
