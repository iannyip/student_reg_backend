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
        include: [
          { model: db.Session },
          { model: db.Item },
          {
            model: db.User,
            attributes: ['id', 'name'],
            include: {
              model: db.Parent,
              attributes: ['id'],
            },
          }],
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

  const edit = async (request, response) => {
    try {
      const { id } = request.params;
      console.log(id);

      const credit = await db.Credit.findOne({
        where: { id },
        include: [
          { model: db.Item },
          {
            model: db.User,
            attributes: ['id', 'name'],
          }],
      });
      const itemsList = await db.Item.findAll({
        attributes: ['id', 'name'],
      });
      const parentList = await db.User.findAll({
        where: { is_parent: true },
        attributes: ['id', 'name'],
      });
      console.log(credit);
      const formMeta = {
        title: 'Edit Credit Purchase',
        notes: 'Warning: Make sure you know what you are dong.',
        formAction: `/credit/edit/${id}?_method=PUT`,
        method: 'post',
        submitVal: 'Update',
        cancelVal: 'Cancel',
        onCancel: `/credit/${id}`,
        breadcrumbs: [
          { text: 'credits', href: '/credits' },
          { text: `${credit.code}`, href: `/credit/${id}` },
          { text: 'edit', href: '' },
        ],
        fields: [
          {
            name: 'code',
            label: 'Code',
            type: 'text',
            placeholder: '',
            value: credit.code,
          },
          {
            name: 'value',
            label: 'Value',
            type: 'number',
            placeholder: '',
            value: credit.value,
          },
          {
            name: 'creditTotal',
            label: 'Total No. of Credits',
            type: 'number',
            placeholder: '',
            value: credit.creditTotal,
          },
          {
            name: 'parentName',
            label: 'Parent Name',
            type: 'select',
            options: parentList,
            placeholder: 'Select from dropdown',
            value: credit.user.name,
          },
          {
            name: 'packageType',
            label: 'Package Type',
            type: 'select',
            options: itemsList,
            placeholder: 'Select from dropdown',
            value: credit.item.name,
          },
          {
            name: 'expiry',
            label: 'Expiry',
            type: 'date',
            placeholder: '',
            value: moment(credit.expiry).format('YYYY-MM-DD'),
          },
        ],
      };
      // response.send(credit);
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
      console.log(inData);
      await db.Credit.update(
        {
          code: inData.code,
          parentId: inData.parentName,
          value: inData.value,
          creditTotal: inData.creditTotal,
          expiry: inData.expiry,
          itemId: inData.itemId,
        },
        { where: { id } },
      );
      response.redirect(`/credit/${id}`);
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
    edit,
    update,
  };
}
