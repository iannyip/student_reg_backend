export default function initEmploymentController(db) {
  const index = async (request, response) => {
    try {
      const allPaySchemes = await db.PayScheme.findAll();
      response.send(allPaySchemes);
    } catch (error) {
      console.log(error);
    }
  };

  // return all methods we define in an object
  return {
    index,
  };
}
