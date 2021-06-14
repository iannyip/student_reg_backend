import moment from 'moment';

export default function initCreditsController(db) {
  const index = async (request, response) => {
    try {
      const allCredits = await db.Credit.findAll({
        include: {
          model: db.User,
          attributes: ['name'],
        },
      });
      // response.send(allCredits);
      response.render('purchases/credits', { allCredits, moment });
    } catch (error) {
      console.log(error);
    }
  };

  // return all methods we define in an object
  return {
    index,
  };
}
