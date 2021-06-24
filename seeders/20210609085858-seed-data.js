const moment = require('moment');
const bcrypt = require('bcrypt');
const readCsvFn = require('./csv-data.js');

const bcryptHasher = async (input) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(input, salt);
  return hash;
};

module.exports = {
  up: async (queryInterface) => {
    try {
      const importedData = await readCsvFn();

      const seedUsers = [];
      const seedItems = [];
      const seedEmployment = [];
      const seedParents = [];
      const seedStudents = [];

      const seedCredits = [];
      const seedInstructors = [];
      const seedCourseTypes = [];
      const seedCoursetypesItems = [];
      const seedCourses = [];

      const seedSessions = [];
      const seedSignups = [];
      const seedAttendances = [];
      const seedAssignments = [];

      console.log(' ======= CREATING SEED ARRAYS =======');
      // 1. USERS
      // note for users that we will need to use for ... in ... syntax
      // to handle aysnchronous bcryptHasher
      importedData.users.shift();
      for (idx in importedData.users) {
        const [id, name, mobile, email, password, is_admin, is_parent] = importedData.users[idx];
        seedUsers.push({
          id,
          name,
          mobile,
          email,
          is_admin,
          is_parent,
          password: await bcryptHasher(password),
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
      // 2. ITEMS
      for (let i = 1; i < importedData.items.length; i += 1) {
      // for (let i = 1; i < 8; i += 1) {
        // console.log(`SeedItem ${i}: ${importedData.items[i]}`);
        const [id, name, credit_count, price, validity] = importedData.items[i];
        seedItems.push({
          id,
          name,
          credit_count,
          price,
          validity,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
      // 3. EMPLOYMENTS
      for (let i = 1; i < importedData.employments.length; i += 1) {
      // for (let i = 1; i < 8; i += 1) {
        // console.log(`SeedEmp ${i}: ${importedData.employments[i]}`);
        const [id, type, name, rate] = importedData.employments[i];
        seedEmployment.push({
          id,
          type,
          name,
          rate,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
      // 4. PARENTS
      for (let i = 1; i < importedData.parents.length; i += 1) {
      // for (let i = 1; i < 8; i += 1) {
        // console.log(`SeedParent ${i}: ${importedData.parents[i]}`);
        const [id, address, postal_code, user_id] = importedData.parents[i];
        seedParents.push({
          id,
          address,
          postal_code,
          user_id,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
      // 5. STUDENTS
      for (let i = 1; i < importedData.students.length; i += 1) {
      // for (let i = 1; i < 8; i += 1) {
        // console.log(`SeedStudent ${i}: ${importedData.students[i]}`);

        const [id, name, dob, additional_info, parent_id] = importedData.students[i];
        // console.log(`seedStudent date: ${moment(dob, 'DD/MM/YYYY').toDate()}`);
        seedStudents.push({
          id,
          name,
          additional_info,
          parent_id,
          dob: moment(dob, 'DD/MM/YYYY').toDate(),
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
      // 6. CREDITS
      for (let i = 1; i < importedData.credits.length; i += 1) {
        const [id, code, parent_id, value, credit_total, purchase_date, expiry, item_id] = importedData.credits[i];
        seedCredits.push({
          id,
          code,
          parent_id,
          value,
          credit_total,
          purchase_date: moment(purchase_date, 'DD/MM/YYYY').toDate(),
          expiry: moment(expiry, 'DD/MM/YYYY').toDate(),
          item_id,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
      // 7. INSTRUCTORS
      for (let i = 1; i < importedData.instructors.length; i += 1) {
        const [id, user_id, rate_id, additional_info] = importedData.instructors[i];
        seedInstructors.push({
          id,
          user_id,
          rate_id,
          additional_info,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
      // 8. COURSETYPES
      for (let i = 1; i < importedData.coursetypes.length; i += 1) {
        const [id, learning_pathway, level, order] = importedData.coursetypes[i];
        seedCourseTypes.push({
          id,
          learning_pathway,
          level,
          order,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
      // 9. COURSETYPE_ITEMS
      for (let i = 1; i < importedData.coursetype_items.length; i += 1) {
        const [id, coursetype_id, item_id] = importedData.coursetype_items[i];
        seedCoursetypesItems.push({
          id,
          coursetype_id,
          item_id,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
      // 10. COURSES
      for (let i = 1; i < importedData.courses.length; i += 1) {
        const [id, name, start_datetime, end_datetime, location, instructor, notes, limit, coursetype_id] = importedData.courses[i];
        seedCourses.push({
          id,
          name,
          start_datetime: moment(start_datetime, 'DD/MM/YYYY HH:mm').toDate(),
          end_datetime: moment(end_datetime, 'DD/MM/YYYY HH:mm').toDate(),
          location,
          instructor: JSON.stringify({ instructor: [] }),
          notes: JSON.stringify({ notes: [] }),
          limit,
          coursetype_id,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
      // 11. SESSIONS
      for (let i = 1; i < importedData.sessions.length; i += 1) {
        const [id, start_datetime, end_datetime, comments, limit, location, instructor, notes, is_chargeable, course_id, session_type] = importedData.sessions[i];
        seedSessions.push({
          id,
          start_datetime: moment(start_datetime, 'DD/MM/YYYY HH:mm').toDate(),
          end_datetime: moment(end_datetime, 'DD/MM/YYYY HH:mm').toDate(),
          comments,
          limit,
          location,
          instructor: JSON.stringify({ instructor: [] }),
          notes: JSON.stringify({ notes: [] }),
          is_chargeable,
          course_id,
          session_type,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
      // 12. SIGNUPS
      for (let i = 1; i < importedData.signups.length; i += 1) {
        const [id, course_id, student_id, comments, status] = importedData.signups[i];
        seedSignups.push({
          id,
          course_id,
          student_id,
          comments,
          status,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
      // 13. ATTENDANCES
      for (let i = 1; i < importedData.attendances.length; i += 1) {
        const [id, session_id, student_id, comments, marked, payment, status] = importedData.attendances[i];
        seedAttendances.push({
          id,
          session_id,
          student_id,
          comments,
          marked,
          payment: (payment === '' ? null : payment),
          status,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
      // 14. ASSIGNMENTS
      for (let i = 1; i < importedData.assignments.length; i += 1) {
        const [id, session_id, instructor_id, rate, role] = importedData.assignments[i];
        seedAssignments.push({
          id,
          session_id,
          instructor_id,
          rate,
          role,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }

      const keys = ['users', 'items', 'employments', 'parents', 'students', 'credits', 'instructors', 'coursetypes', 'coursetype_items', 'courses', 'sessions', 'signups', 'attendances', 'assignments'];

      const seeded = {};

      const seededArr = [];

      console.log(' ======= INSERTING SEED ARRAYS =======');

      const seededUsers = await queryInterface.bulkInsert('users', seedUsers, { returning: true });
      console.log(`users: ${seededUsers.length}`);

      const seededItems = await queryInterface.bulkInsert('items', seedItems, { returning: true });
      console.log(`items: ${seededItems.length}`);

      const seededEmployment = await queryInterface.bulkInsert('employments', seedEmployment, { returning: true });
      console.log(`employments: ${seededEmployment.length}`);

      const seededParents = await queryInterface.bulkInsert('parents', seedParents, { returning: true });
      console.log(`parents: ${seededParents.length}`);

      const seededStudents = await queryInterface.bulkInsert('students', seedStudents, { returning: true });
      console.log(`students: ${seededStudents.length}`);

      const seededCredits = await queryInterface.bulkInsert('credits', seedCredits, { returning: true });
      console.log(`credits: ${seededCredits.length}`);

      const seededInstructors = await queryInterface.bulkInsert('instructors', seedInstructors, { returning: true });
      console.log(`instructors: ${seededInstructors.length}`);

      const seededCoursetypes = await queryInterface.bulkInsert('coursetypes', seedCourseTypes, { returning: true });
      console.log(`coursetypes: ${seededCoursetypes.length}`);

      const seededCoursetypesItems = await queryInterface.bulkInsert('coursetype_items', seedCoursetypesItems, { returning: true });
      console.log(`coursetype_items: ${seededCoursetypesItems.length}`);

      const seededCourses = await queryInterface.bulkInsert('courses', seedCourses, { returning: true });
      console.log(`courses: ${seededCourses.length}`);

      const seededSessions = await queryInterface.bulkInsert('sessions', seedSessions, { returning: true });
      console.log(`sessions: ${seededSessions.length}`);

      const seededSignups = await queryInterface.bulkInsert('signups', seedSignups, { returning: true });
      console.log(`signups: ${seededSignups.length}`);

      const seededAttendances = await queryInterface.bulkInsert('attendances', seedAttendances, { returning: true });
      console.log(`attendances: ${seededAttendances.length}`);

      const seededAssignments = await queryInterface.bulkInsert('assignments', seedAssignments, { returning: true });
      console.log(`assignments: ${seededAssignments.length}`);
    } catch (error) {
      console.log('-----------error message-------------');
      console.log(error);
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('assignments', null, {});
    await queryInterface.bulkDelete('attendances', null, {});
    await queryInterface.bulkDelete('signups', null, {});
    await queryInterface.bulkDelete('sessions', null, {});
    await queryInterface.bulkDelete('courses', null, {});

    await queryInterface.bulkDelete('coursetype_items', null, {});
    await queryInterface.bulkDelete('coursetypes', null, {});
    await queryInterface.bulkDelete('instructors', null, {});
    await queryInterface.bulkDelete('credits', null, {});
    await queryInterface.bulkDelete('students', null, {});

    await queryInterface.bulkDelete('parents', null, {});
    await queryInterface.bulkDelete('employments', null, {});
    await queryInterface.bulkDelete('items', null, {});
    await queryInterface.bulkDelete('users', null, {});
  },
};
