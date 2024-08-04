import moment from 'moment';

export default function initCreditsController(db) {
  const indexAll = async (request, response) => {
    try {
      // navtabs
      const navtabs = [
        {
          text: 'All',
          link: '#',
          active: true,
        },
        {
          text: 'Unused',
          link: '/credits/unused',
          active: false,
        },
        {
          text: 'Used',
          link: '/credits/used',
          active: false,
        },
      ];
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
      response.render('purchases/credits', { credits: allCredits, moment, navtabs });
    } catch (error) {
      console.log(error);
    }
  };

  const indexUnused = async (request, response) => {
    try {
      // navtabs
      const navtabs = [
        {
          text: 'All',
          link: '/credits',
          active: false,
        },
        {
          text: 'Unused',
          link: '#',
          active: true,
        },
        {
          text: 'Used',
          link: '/credits/used',
          active: false,
        },
      ];
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

      const unusedCredits = [];
      allCredits.forEach((credit) => {
        if (credit.creditTotal > credit.attendances.length) {
          unusedCredits.push(credit);
        }
      });

      // response.send(unusedCredits);
      response.render('purchases/credits', { credits: unusedCredits, moment, navtabs });
    } catch (error) {
      console.log(error);
    }
  };

  const indexUsed = async (request, response) => {
    try {
      // navtabs
      const navtabs = [
        {
          text: 'All',
          link: '/credits',
          active: false,
        },
        {
          text: 'Unused',
          link: '/credits/unused',
          active: false,
        },
        {
          text: 'Used',
          link: '#',
          active: true,
        },
      ];
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
      const usedCredits = [];
      allCredits.forEach((credit) => {
        if (credit.creditTotal <= credit.attendances.length) {
          usedCredits.push(credit);
        }
      });
      // response.send(allCredits);
      response.render('purchases/credits', { credits: usedCredits, moment, navtabs });
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
          { model: db.Item },
          {
            model: db.Attendance,
            include: [{
              model: db.Session,
              attributes: ['id', 'startDatetime', 'courseId'],
              include: {
                model: db.Course,
                attributes: ['id', 'name', 'coursetypeId'],
                include: {
                  model: db.Coursetype,
                  attributes: ['id', 'learningPathway'],
                },
              },
            },
            {
              model: db.Student,
              attributes: ['id', 'name'],
            }],
          },
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
      const today = moment(new Date());
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
            name: 'purchaseDate',
            label: 'Purchase Date',
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
        purchaseDate: formData.purchaseDate,
        expiry: moment(formData.purchaseDate).add(item.validity, 'months'),
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
            name: 'purchaseDate',
            label: 'Purchase Date',
            type: 'date',
            placeholder: '',
            value: moment(credit.purchaseDate).format('YYYY-MM-DD'),
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

      await db.Credit.update(
        {
          code: inData.code,
          parentId: inData.parentName,
          value: inData.value,
          creditTotal: inData.creditTotal,
          purchaseDate: inData.purchaseDate,
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
    indexAll,
    indexUnused,
    indexUsed,
    show,
    createForm,
    create,
    edit,
    update,
  };
}
