export default function initInstructorsController(db) {
  const index = async (request, response) => {
    try {
      const allInstructors = await db.Instructor.findAll({ include: [db.User, db.Employment] });
      response.send(allInstructors);
    } catch (error) {
      console.log(error);
    }
  };

  // return all methods we define in an object
  return {
    index,
  };
}
