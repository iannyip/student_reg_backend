export default function initItemsController(db) {
  const index = async (request, response) => {
    try {
      const allItems = await db.Item.findAll({
        include: {
          model: db.Coursetype,
          attributes: ['id', 'learningPathway'],
        },
      });

      allItems.forEach((item) => {
        const coursetypesArr = [];
        item.coursetypes.forEach((coursetype) => {
          if (!coursetypesArr.includes(coursetype.learningPathway)) {
            coursetypesArr.push(coursetype.learningPathway);
          }
        });
        item.dataValues.coursetypesArr = coursetypesArr;
      });

      // response.send(allItems);
      response.render('purchases/items', { allItems });
    } catch (error) {
      console.log(error);
    }
  };
  const show = async (request, response) => {
    try {
      const { id } = request.params;
      const item = await db.Item.findOne({
        where: { id },
        include: db.Coursetype,
      });
      // response.send(item);
      response.render('purchases/item', { item });
    } catch (error) {
      console.log(error);
    }
  };
  const createForm = async (request, response) => {
    try {
      const formMeta = {
        title: 'Create Credit Type',
        notes: 'Add applicable course types after creating credit type',
        formAction: '/items/new',
        method: 'post',
        submitVal: 'Submit',
        cancelVal: 'Cancel',
        onCancel: '/items',
        breadcrumbs: [
          { text: 'credits', href: '/credits' },
          { text: 'credit types', href: '/items' },
          { text: 'new credit type', href: '' },
        ],
        fields: [
          {
            name: 'name',
            label: 'Name',
            type: 'text',
            placeholder: '4-session package',
            value: '',
          },
          {
            name: 'creditCount',
            label: 'No. of Credits',
            type: 'number',
            placeholder: '',
            value: '',
          },
          {
            name: 'price',
            label: 'Price',
            type: 'number',
            placeholder: '',
            value: '',
          },
          {
            name: 'validity',
            label: 'Validity (months)',
            type: 'number',
            placeholder: 'in months',
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
      const { id } = request.params;
      const formData = request.body;
      // console.log(formData);
      const newItem = await db.Item.create({
        name: formData.name,
        creditCount: formData.creditCount,
        price: formData.price,
        validity: formData.validity,
      });
      response.redirect(`/item/${newItem.id}`);
    } catch (error) {
      console.log(error);
    }
  };
  const edit = async (request, response) => {
    try {
      const { id } = request.params;
      const item = await db.Item.findOne({ where: { id } });
      const formMeta = {
        title: 'Edit Credit Type',
        notes: 'Changes will only apply to subsequent purchases',
        formAction: `/item/edit/${item.id}?_method=PUT`,
        method: 'post',
        submitVal: 'Update',
        cancelVal: 'Cancel',
        onCancel: `/item/${item.id}`,
        breadcrumbs: [
          { text: 'credits', href: '/credits' },
          { text: 'credit types', href: '/items' },
          { text: `${item.name}`, href: `item/${item.id}` },
          { text: 'edit', href: '' },
        ],
        fields: [
          {
            name: 'name',
            label: 'Name',
            type: 'text',
            placeholder: '4-session package',
            value: item.name,
          },
          {
            name: 'creditCount',
            label: 'No. of Credits',
            type: 'number',
            placeholder: '',
            value: item.creditCount,
          },
          {
            name: 'price',
            label: 'Price ($)',
            type: 'number',
            placeholder: '',
            value: item.price,
          },
          {
            name: 'validity',
            label: 'Validity (months)',
            type: 'number',
            placeholder: 'in months',
            value: item.validity,
          },
        ],
      };
      response.render('partial/formTemplate', { form: formMeta });
    } catch (error) {
      console.log(error);
    }
  };
  const update = async (request, response) => {
    try {
      const { id } = request.params;
      const inData = request.body;
      await db.Item.update(
        {
          name: inData.name,
          creditCount: inData.creditCount,
          price: inData.price,
          validity: inData.validity,
        },
        { where: { id } },
      );
      response.redirect(`/item/${id}`);
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
