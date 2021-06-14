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

  // return all methods we define in an object
  return {
    index,
    show,
  };
}
