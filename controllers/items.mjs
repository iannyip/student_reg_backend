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

  // return all methods we define in an object
  return {
    index,
  };
}
