import moment from 'moment';

export default function initCreditsController(db) {
  const index = async (request, response) => {
    try {
      const allCredits = await db.Credit.findAll({
        include: [{
          model: db.User,
          attributes: ['id', 'name'],
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
      const itemsList = await db.Item.findAll({
        attributes: ['id', 'name'],
      });
      const parentList = await db.User.findAll({
        where: { is_parent: true },
        attributes: ['id', 'name'],
      });
      console.log(itemsList);
      console.log(parentList);
      const formMeta = {
        title: 'Create new course type',
        formAction: '/credits/new',
        method: 'post',
        submitVal: 'Submit',
        cancelVal: 'Cancel',
        onCancel: '/credits',
        fields: [
          {
            name: 'code',
            label: 'Package Code',
            type: 'text',
            placeholder: 'Code',
          },
          {
            name: 'parentName',
            label: 'Parent Name',
            type: 'select',
            options: parentList,
            placeholder: 'Select from dropdown',
          },
          {
            name: 'packageType',
            label: 'Package Type',
            type: 'select',
            options: itemsList,
            placeholder: 'Select from dropdown',
          },
          {
            name: 'expiry',
            label: 'Expiry',
            type: 'date',
            placeholder: '',
          },
        ],
      };
      // response.send(formMeta);
      response.render('purchases/newPurchaseForm', { formMeta });
    } catch (error) {
      console.log(error);
    }
  };

  const create = async (request, response) => {
    try {
      console.log('request came in');
      console.log(request.body);
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
