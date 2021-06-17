import db from './models/index.mjs';

// import your controllers here
import initUsersController from './controllers/users.mjs';
import initItemsController from './controllers/items.mjs';
import initEmploymentController from './controllers/employment.mjs';
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
  const EmploymentController = initEmploymentController(db);
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
  app.get('/', (request, response) => {
    // response.redirect('students');
    response.send('root page. building in progress!');
  });

  // DASHBOARD
  app.get('/dashboard', CoursesController.dashboard);

  // PEOPLE
  app.get('/users', UsersController.index);
  app.get('/students', StudentsController.index);
  app.get('/student/:id', StudentsController.show);
  app.get('/students/new', StudentsController.createForm);
  app.post('/students/new', StudentsController.create);
  app.get('/student/edit/:id', StudentsController.edit);
  app.put('/student/edit/:id', StudentsController.update);

  app.get('/parent/:id', ParentsController.show);
  app.get('/parents/new', ParentsController.createForm);
  app.post('/parents/new', ParentsController.create);
  app.get('/parent/edit/:id', ParentsController.edit);
  app.put('/parent/edit/:id', ParentsController.update);

  app.get('/instructors', InstructorsController.index);
  app.get('/instructor/:id', InstructorsController.show);
  app.get('/instructors/new', InstructorsController.createForm);
  app.post('/instructors/new', InstructorsController.create);

  app.get('/employment', EmploymentController.index);
  app.get('/employment/new', EmploymentController.createForm);
  app.post('/employment/new', EmploymentController.create);

  // COURSES
  app.get('/courses', CoursesController.index);
  app.get('/course/:id', CoursesController.show);
  app.get('/courses/new/:pathwayName', CoursesController.createForm);
  app.post('/courses/new', CoursesController.create);

  app.get('/coursetypes', CoursetypesController.index);
  app.get('/coursetypes/pathways', CoursetypesController.courseLevelIndex);
  app.get('/coursetypes/new', CoursetypesController.createForm);
  app.post('/coursetypes/new', CoursetypesController.create);
  app.get('/coursetypes/edit/:id', CoursetypesController.edit);
  app.put('/coursetypes/edit/:id', CoursetypesController.update);

  // CREDITS
  app.get('/credits', CreditsController.index);
  app.get('/credit/:id', CreditsController.show);
  app.get('/credits/new', CreditsController.createForm);
  app.post('/credits/new', CreditsController.create);
}
