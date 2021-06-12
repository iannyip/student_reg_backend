import db from './models/index.mjs';

// import your controllers here
import initUsersController from './controllers/users.mjs';
import initItemsController from './controllers/items.mjs';
import initPayschemesController from './controllers/paySchemes.mjs';
import initParentsController from './controllers/parents.mjs';
import initStudentsController from './controllers/students.mjs';
import initCreditsController from './controllers/credits.mjs';
import initInstructorsController from './controllers/instructors.mjs';
import initCoursetypesitemsController from './controllers/coursetypesItems.mjs';
import initSignupsController from './controllers/signups.mjs';
import initAttendancesController from './controllers/attendances.mjs';
import initAssignmentsController from './controllers/assignments.mjs';
import initCoursetypesController from './controllers/coursetypes.mjs';
import initCoursesController from './controllers/courses.mjs';
import initSessionsController from './controllers/sessions.mjs';

export default function bindRoutes(app) {
  // initialize the controller functions here
  // pass in the db for all callbacks
  const UsersController = initUsersController(db);
  const ItemsController = initItemsController(db);
  const PayschemesController = initPayschemesController(db);
  const ParentsController = initParentsController(db);
  const StudentsController = initStudentsController(db);
  const CreditsController = initCreditsController(db);
  const InstructorsController = initInstructorsController(db);
  const CoursetypesitemsController = initCoursetypesitemsController(db);
  const SignupsController = initSignupsController(db);
  const AttendancesController = initAttendancesController(db);
  const AssignmentsController = initAssignmentsController(db);
  const CoursetypesController = initCoursetypesController(db);
  const CoursesController = initCoursesController(db);
  const SessionsController = initSessionsController(db);

  // define your route matchers here using app
}
