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
            label: 'Validity (years)',
            type: 'number',
            placeholder: 'in years',
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
      });
      response.redirect(`/item/${newItem.id}`);
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
