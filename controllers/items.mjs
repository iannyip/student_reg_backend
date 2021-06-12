export default function initItemsController(db) {
  const index = async (request, response) => {
    try {
      const allItems = await db.Item.findAll();
      response.send(allItems);
    } catch (error) {
      console.log(error);
    }
  };

  // return all methods we define in an object
  return {
    index,
  };
}
