export default function initCoursetypesController(db) {
  const index = async (request, response) => {
    try {
      const allCoursetypes = await db.Coursetype.findAll();
      response.send(allCoursetypes);
    } catch (error) {
      console.log(error);
    }
  };

  // return all methods we define in an object
  return {
    index,
  };
}
