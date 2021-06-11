import { Sequelize } from 'sequelize';
import allConfig from '../config/config.js';

import initUserModel from './user.mjs';
import initItemModel from './item.mjs';
import initPaySchemeModel from './payScheme.mjs';
import initParentModel from './parent.mjs';
import initStudentModel from './student.mjs';
import initCreditModel from './credit.mjs';
import initInstructorModel from './instructor.mjs';
import initCourseTypeModel from './courseType.mjs';
import initCourseModel from './course.mjs';
import initSessionModel from './session.mjs';
import initSignupModel from './signup.mjs';
import initAttendanceModel from './attendance.mjs';
import initAssignmentModel from './assignment.mjs';


const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

// add your model definitions to db here
db.User = initUserModel(sequelize, Sequelize.DataTypes);
db.Item = initItemModel(sequelize, Sequelize.DataTypes);
db.PayScheme = initPaySchemeModel(sequelize, Sequelize.DataTypes);
db.Parent = initParentModel(sequelize, Sequelize.DataTypes);
db.Student = initStudentModel(sequelize, Sequelize.DataTypes);
db.Credit = initCreditModel(sequelize, Sequelize.DataTypes);
db.Instructor = initInstructorModel(sequelize, Sequelize.DataTypes);
db.Coursetype = initCoursetypeModel(sequelize, Sequelize.DataTypes);
db.Course = initCourseModel(sequelize, Sequelize.DataTypes);
db.Session = initSessionModel(sequelize, Sequelize.DataTypes);
db.Signup = initSignupModel(sequelize, Sequelize.DataTypes);
db.Attendance = initAttendanceModel(sequelize, Sequelize.DataTypes);
db.Assignment = initAssignmentModel(sequelize, Sequelize.DataTypes);

// Define M-M relationships here
// -- Signup through table
db.Course.belongsToMany(db.Student, { through: db.Signup, foreignKey: 'courseId'});
db.Student.belongsToMany(db.Course, { through: db.Signup, foreignKey: 'studentId'});
// -- Attendance through table
db.Session.belongsToMany(db.Student, { through: db.Attendance, foreignKey: 'sessionId'});
db.Student.belongsToMany(db.Session, { through: db.Attendance, foreignKey: 'studentId'});
db.Session.belongsToMany(db.Credit, { through: db.Attendance, foreignKey: 'sessionId'});
db.Credit.belongsToMany(db.Session, { through: db.Attendance, foreignKey: 'payment'});
// -- Assignment through table
db.Session.belongsToMany(db.Instructor, { through: db.Assignment, foreignKey: 'sessionId'});
db.Instructor.belongsToMany(db.Session, { through: db.Assignment, foreignKey: 'payment'});
// -- CourseTypes and items through table
db.Coursetype.belongsToMany(db.Item, { through: 'coursetype_items' });
db.Item.belongsToMany(db.Coursetype, { through: 'coursetype_items' });

// Define 1-M relationships here
db.User.hasMany(db.Student);
db.Student.belongsTo(db.User,{ foreignKey: 'parentId'});
db.User.hasMany(db.Credit);
db.Credit.belongsTo(db.User, { foreignKey: 'parentId'});
db.PayScheme.hasMany(db.Instructor);
db.Instructor.belongsTo(db.PayScheme, { foreignKey: 'rateId'});
db.Coursetype.hasMany(db.Course);
db.Course.belongsTo(db.Coursetype, { foreignKey: 'coursetypeId'}); 
db.Course.hasMany(db.Session);
db.Session.belongsTo(db.Course); // default courseId FK
db.Item.hasMany(db.Credit);
db.Credit.belongsTo(db.Item, { foreignKey: 'itemId'});
// -- Signup through table
db.Student.hasMany(db.Signup);
db.Signup.belongsTo(db.Student);
db.Course.hasMany(db.Signup);
db.Signup.belongsTo(db.Course); 
// -- Attendance through table
db.Student.hasMany(db.Attendance);
db.Attendance.belongsTo(db.Student);
db.Session.hasMany(db.Attendance);
db.Attendance.belongsTo(db.Session);
db.Credit.hasMany(db.Attendance);
db.Attendance.belongsTo(db.Credit);
// -- Assignment through table
db.Session.hasMany(db.Assignment);
db.Assignment.belongsTo(db.Session);
db.Instructor.hasMany(db.Assignment);
db.Assignment.belongsTo(db.Instructor);


db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;