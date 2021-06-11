import { Sequelize } from 'sequelize';
import allConfig from '../config/config.js';

import initUserModel from './user.mjs';
import initPaySchemeModel from './payScheme.mjs';
import initParentModel from './parent.mjs';
import initStudentModel from './student.mjs';
import initCoursePackageModel from './coursePackage.mjs';
import initInstructorModel from './user.mjs';
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
db.user = initUserModel(sequelize, Sequelize.DataTypes);
db.payScheme = initPaySchemeModel(sequelize, Sequelize.DataTypes);
db.parent = initParentModel(sequelize, Sequelize.DataTypes);
db.student = initStudentModel(sequelize, Sequelize.DataTypes);
db.coursePackage = initCoursePackageModel(sequelize, Sequelize.DataTypes);
db.user = initInstructorModel(sequelize, Sequelize.DataTypes);
db.courseType = initCourseTypeModel(sequelize, Sequelize.DataTypes);
db.course = initCourseModel(sequelize, Sequelize.DataTypes);
db.session = initSessionModel(sequelize, Sequelize.DataTypes);
db.signup = initSignupModel(sequelize, Sequelize.DataTypes);
db.attendance = initAttendanceModel(sequelize, Sequelize.DataTypes);
db.assignment = initAssignmentModel(sequelize, Sequelize.DataTypes);



db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;