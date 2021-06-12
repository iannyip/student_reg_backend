export default function initParentsController(db) {
  const index = async (request, response) => {
    try {
      const allParents = await db.Parents.findAll();
      response.send(allParents);
    } catch (error) {
      console.log(error);
    }
  };

  // return all methods we define in an object
  return {
    index,
  };
}
