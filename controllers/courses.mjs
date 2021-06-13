export default function initCoursesController(db) {
  const index = async (request, response) => {
    try {
      const allCourses = await db.Course.findAll();
      response.send(allCourses);
      // response.render('courses');
    } catch (error) {
      console.log(error);
    }
  };

  // return all methods we define in an object
  return {
    index,
  };
}
