export default function initEmploymentController(db) {
  const index = async (request, response) => {
    try {
      const allEmployment = await db.Employment.findAll();
      response.send(allEmployment);
    } catch (error) {
      console.log(error);
    }
  };

  // return all methods we define in an object
  return {
    index,
  };
}
