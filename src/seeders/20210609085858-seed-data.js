const moment = require('moment');
const bcrypt = require('bcrypt');
const fs = require('fs/promises');
const readCsvFn = require('./csv-data.js');

const bcryptHasher = async (input) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(input, salt);
  return hash;
};

function getRandomPastDateBetweenYears(minYears, maxYears) {
  const currentDate = moment();
  const minDate = currentDate.clone().subtract(maxYears, 'years');
  const maxDate = currentDate.clone().subtract(minYears, 'years');
  const randomDate = moment(
    minDate.valueOf() + Math.random() * (maxDate.valueOf() - minDate.valueOf())
  ).toDate();
  return randomDate;
}

function getRandomClassDateTimeInNext30Days() {
  const times = ['09:30', '13:00', '16:00'];
  const randomTime = times[Math.floor(Math.random() * times.length)];
  const today = moment();
  const endDate = today.clone().add(30, 'days');
  const randomTimestamp =
    today.valueOf() + Math.random() * (endDate.valueOf() - today.valueOf());

  // Create a Moment.js object from the random timestamp
  const randomDate = moment(randomTimestamp)
    .startOf('day')
    .add(moment.duration(randomTime));

  return randomDate.toDate();
}

async function readJsonFile(filePath) {
  try {
    console.log('reading file...');
    const data = await fs.readFile(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (err) {
    console.error('Error reading or parsing file:', err);
    throw err;
  }
}

module.exports = {
  up: async (queryInterface) => {
    try {
      // const importedData = await readCsvFn();
      const importedData = await readJsonFile('jsonData.json');

      const seedUsers = [];

      console.log(' ======= CREATING SEED ARRAYS =======');
      // 1. USERS
      // note for users that we will need to use for ... in ... syntax
      // to handle aysnchronous bcryptHasher
      for (idx in importedData.users) {
        const defaultPassword = 'qwerty';
        seedUsers.push({
          ...importedData.users[idx],
          password: await bcryptHasher(defaultPassword),
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
      // 2. ITEMS
      const seedItems = importedData.items.map((item) => ({
        ...item,
        created_at: new Date(),
        updated_at: new Date(),
      }));
      // 3. EMPLOYMENTS
      const seedEmployment = importedData.employments.map((employment) => ({
        ...employment,
        created_at: new Date(),
        updated_at: new Date(),
      }));
      // 4. PARENTS
      const seedParents = importedData.parents.map((parent) => ({
        ...parent,
        created_at: new Date(),
        updated_at: new Date(),
      }));
      // 5. STUDENTS
      const seedStudents = importedData.students.map((student) => ({
        ...student,
        // dob: getRandomPastDateBetweenYears(7, 12),
        created_at: new Date(),
        updated_at: new Date(),
      }));
      // 6. CREDITS
      const seedCredits = importedData.credits.map((credit) => {
        const purchaseDate = getRandomPastDateBetweenYears(0, 1);
        return {
          ...credit,
          // purchase_date: purchaseDate,
          // expiry: moment(purchaseDate).add(2, 'year').toDate(),
          created_at: new Date(),
          updated_at: new Date(),
        };
      });
      // 7. INSTRUCTORS
      const seedInstructors = importedData.instructors.map((instructor) => ({
        ...instructor,
        created_at: new Date(),
        updated_at: new Date(),
      }));
      // 8. COURSETYPES
      const seedCourseTypes = importedData.coursetypes.map((coursetype) => ({
        ...coursetype,
        created_at: new Date(),
        updated_at: new Date(),
      }));
      // 9. COURSETYPE_ITEMS
      const seedCoursetypesItems = importedData.coursetype_items.map(
        (courseTypeItem) => ({
          ...courseTypeItem,
          created_at: new Date(),
          updated_at: new Date(),
        })
      );
      // 10. COURSES
      const seedCourses = importedData.courses.map((course) => {
        const classStart = getRandomClassDateTimeInNext30Days();
        return {
          ...course,
          // start_datetime: classStart,
          // end_datetime: moment(classStart).add(2.5, 'hours').toDate(),
          instructor: JSON.stringify({ instructor: [] }),
          notes: JSON.stringify({ notes: [] }),
          created_at: new Date(),
          updated_at: new Date(),
        };
      });
      // 11. SESSIONS
      const seedSessions = importedData.sessions.map((session) => ({
        ...session,
        instructor: JSON.stringify({ instructor: [] }),
        notes: JSON.stringify({ notes: [] }),
        created_at: new Date(),
        updated_at: new Date(),
      }));
      // 12. SIGNUPS
      const seedSignups = importedData.signups.map((signup) => ({
        ...signup,
        created_at: new Date(),
        updated_at: new Date(),
      }));
      // 13. ATTENDANCES
      const seedAttendances = importedData.attendances.map((attendance) => ({
        ...attendance,
        payment: attendance.payment === '' ? null : attendance.payment,
        created_at: new Date(),
        updated_at: new Date(),
      }));
      // 14. ASSIGNMENTS
      const seedAssignments = importedData.assignments.map((assignment) => ({
        ...assignment,
        created_at: new Date(),
        updated_at: new Date(),
      }));

      console.log(' ======= INSERTING SEED ARRAYS =======');

      const seededUsers = await queryInterface.bulkInsert('users', seedUsers, {
        returning: true,
      });
      console.log(`users: ${seededUsers.length}`);

      const seededItems = await queryInterface.bulkInsert('items', seedItems, {
        returning: true,
      });
      console.log(`items: ${seededItems.length}`);

      const seededEmployment = await queryInterface.bulkInsert(
        'employments',
        seedEmployment,
        { returning: true }
      );
      console.log(`employments: ${seededEmployment.length}`);

      const seededParents = await queryInterface.bulkInsert(
        'parents',
        seedParents,
        { returning: true }
      );
      console.log(`parents: ${seededParents.length}`);

      const seededStudents = await queryInterface.bulkInsert(
        'students',
        seedStudents,
        { returning: true }
      );
      console.log(`students: ${seededStudents.length}`);

      const seededCredits = await queryInterface.bulkInsert(
        'credits',
        seedCredits,
        { returning: true }
      );
      console.log(`credits: ${seededCredits.length}`);

      const seededInstructors = await queryInterface.bulkInsert(
        'instructors',
        seedInstructors,
        { returning: true }
      );
      console.log(`instructors: ${seededInstructors.length}`);

      const seededCoursetypes = await queryInterface.bulkInsert(
        'coursetypes',
        seedCourseTypes,
        { returning: true }
      );
      console.log(`coursetypes: ${seededCoursetypes.length}`);

      const seededCoursetypesItems = await queryInterface.bulkInsert(
        'coursetype_items',
        seedCoursetypesItems,
        { returning: true }
      );
      console.log(`coursetype_items: ${seededCoursetypesItems.length}`);

      const seededCourses = await queryInterface.bulkInsert(
        'courses',
        seedCourses,
        { returning: true }
      );
      console.log(`courses: ${seededCourses.length}`);

      const seededSessions = await queryInterface.bulkInsert(
        'sessions',
        seedSessions,
        { returning: true }
      );
      console.log(`sessions: ${seededSessions.length}`);

      const seededSignups = await queryInterface.bulkInsert(
        'signups',
        seedSignups,
        { returning: true }
      );
      console.log(`signups: ${seededSignups.length}`);

      const seededAttendances = await queryInterface.bulkInsert(
        'attendances',
        seedAttendances,
        { returning: true }
      );
      console.log(`attendances: ${seededAttendances.length}`);

      const seededAssignments = await queryInterface.bulkInsert(
        'assignments',
        seedAssignments,
        { returning: true }
      );
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
