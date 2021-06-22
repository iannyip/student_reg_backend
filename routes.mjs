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
    response.redirect('/courses');
    // response.send('root page. building in progress!');
  });

  // DASHBOARD
  app.get('/dashboard', CoursesController.dashboard);

  // PEOPLE
  app.get('/users', UsersController.index);
  app.get('/createUser', UsersController.create);

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
  app.get('/instructor/edit/:id', InstructorsController.edit);
  app.put('/instructor/edit/:id', InstructorsController.update);

  app.get('/employment', EmploymentController.index);
  app.get('/employment/new', EmploymentController.createForm);
  app.post('/employment/new', EmploymentController.create);
  app.get('/employment/edit/:id', EmploymentController.edit);
  app.put('/employment/edit/:id', EmploymentController.update);

  // COURSES
  app.get('/courses', CoursesController.index);
  app.get('/course/:id', CoursesController.show);
  app.get('/courses/new/:pathwayName', CoursesController.createForm);
  app.post('/courses/new', CoursesController.create);
  app.get('/course/register/:id', CoursesController.registerForm);
  app.post('/course/register/:id', CoursesController.register);

  app.get('/coursetypes', CoursetypesController.index);
  app.get('/coursetypes/pathways', CoursetypesController.courseLevelIndex);
  app.get('/coursetypes/new', CoursetypesController.createForm);
  app.post('/coursetypes/new', CoursetypesController.create);
  app.get('/coursetypes/edit/:id', CoursetypesController.edit);
  app.put('/coursetypes/edit/:id', CoursetypesController.update);

  app.get('/course/addSession/:id', SessionsController.createForm);
  app.post('/course/addSession/:id', SessionsController.create);

  app.get('/session/:id', SessionsController.show);

  // CREDITS
  app.get('/credits', CreditsController.index);
  app.get('/credit/:id', CreditsController.show);
  app.get('/credits/new', CreditsController.createForm);
  app.post('/credits/new', CreditsController.create);
  app.get('/credit/edit/:id', CreditsController.edit);
  app.put('/credit/edit/:id', CreditsController.update);

  app.get('/items', ItemsController.index);
  app.get('/items/new', ItemsController.createForm);
  app.post('/items/new', ItemsController.create);
  app.get('/item/:id', ItemsController.show);
  app.get('/item/edit/:id', ItemsController.edit);
  app.put('/item/edit/:id', ItemsController.update);

  // ATTENDANCE
  app.get('/attendance/payment/:id', AttendancesController.pmtForm);
  app.put('/attendance/payment/:id', AttendancesController.pmtUpdate);
  // app.get('/attendance/payment/:id', AttendancesController.statusForm);
  // app.put('/attendance/payment/:id', AttendancesController.statysUpdate);

  // ASSIGNMENTS
  app.get('/assignment/new/:courseId', AssignmentsController.courseIntForm);
  app.post('/assignment/new/:courseId', AssignmentsController.courseIntCreate);

  // LOGIN
  app.get('/login', UsersController.createLogin);
  app.post('/login', UsersController.verifyLogin);
  app.delete('/logout', UsersController.logout);
}
