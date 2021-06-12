export default function initPayschemesController(db) {
  const index = async (request, response) => {
    try {
      await db.Item.findAll();
    } catch (error) {
      console.log(error);
    }
  };

  // return all methods we define in an object
  return {
    index,
  };
}
