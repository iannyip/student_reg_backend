// const jsSha = require('jssha');
// const csvData = require('./csv-data.js');

// const hash = (input) => {
//   const shaObj = new jsSha('SHA-512', 'TEXT', { encoding: 'UTF8' });
//   const unhashedString = `${input}`;
//   shaObj.update(unhashedString);
//   return shaObj.getHash('HEX');
// };
// module.exports = {
//   up: async (queryInterface) => {
//     try {
//       const {
//         csvUsers,
//         csvItems,
//         csvEmployments,
//         csvParents,
//         csvStudents,

//         csvCredits,
//         csvInstructors,
//         csvCoursetypes,
//         csvCoursetypeItems,
//         csvCourses,

//         csvSessions,
//         csvSignups,
//         csvAttendances,
//         csvAssignments,
//       } = csvData;
//       console.log(csvUsers[0]);
//       console.log(csvItems[0]);
//       console.log(csvEmployments[0]);

//       const seedUsers = [];
//       const seedItems = [];
//       const seedEmployment = [];
//       const seedParents = [];
//       const seedStudents = [];

//       const seedCredits = [];
//       const seedInstructors = [];
//       const seedCourseTypes = [];
//       const seedCoursetypesItems = [];
//       const seedCourses = [];

//       const seedSessions = [];
//       const seedSignups = [];
//       const seedAttendances = [];
//       const seedAssignments = [];

//       // USERS
//       for (let i = 0; i < csvUsers.length; i += 1) {
//         const row = csvUsers[i];
//         seedUsers.push({
//           row,
//           password: hash(row.password),
//           created_at: new Date(),
//           updated_at: new Date(),
//         });
//       }
//       // ITEMS
//       for (let i = 0; i < csvItems.length; i += 1) {
//         const row = csvItems[i];
//         seedItems.push({
//           row,
//           created_at: new Date(),
//           updated_at: new Date(),
//         });
//       }
//       // EMPLOYMENTS
//       for (let i = 0; i < csvEmployments.length; i += 1) {
//         const row = csvEmployments[i];
//         seedEmployment.push({
//           row,
//           created_at: new Date(),
//           updated_at: new Date(),
//         });
//       }
//       // PARENTS
//       for (let i = 0; i < csvParents.length; i += 1) {
//         const row = csvParents[i];
//         seedParents.push({
//           row,
//           created_at: new Date(),
//           updated_at: new Date(),
//         });
//       }
//       // STUDENTS
//       for (let i = 0; i < csvStudents.length; i += 1) {
//         const row = csvStudents[i];
//         seedStudents.push({
//           row,
//           dob: new Date(Date.parse(row.dob)),
//           created_at: new Date(),
//           updated_at: new Date(),
//         });
//       }

//       await queryInterface.bulkInsert('users', seedUsers);
//       await queryInterface.bulkInsert('items', seedItems);
//       await queryInterface.bulkInsert('employments', seedEmployment);
//       await queryInterface.bulkInsert('parents', seedParents);
//       await queryInterface.bulkInsert('students', seedStudents);

//       // await queryInterface.bulkInsert('credits', seedCredits);
//       // await queryInterface.bulkInsert('instructors', seedInstructors);
//       // await queryInterface.bulkInsert('coursetypes', seedCourseTypes);
//       // await queryInterface.bulkInsert('coursetype_items', seedCoursetypesItems);
//       // await queryInterface.bulkInsert('courses', seedCourses);

//       // await queryInterface.bulkInsert('sessions', seedSessions);
//       // await queryInterface.bulkInsert('signups', seedSignups);
//       // await queryInterface.bulkInsert('attendances', seedAttendances);
//       // await queryInterface.bulkInsert('assignments', seedAssignments);
//     } catch (error) {
//       console.log('-----------error message-------------');
//       console.log(error);
//     }
//   },

//   down: async (queryInterface) => {
//     // await queryInterface.bulkDelete('assignments', null, {});
//     // await queryInterface.bulkDelete('attendances', null, {});
//     // await queryInterface.bulkDelete('signups', null, {});
//     // await queryInterface.bulkDelete('sessions', null, {});
//     // await queryInterface.bulkDelete('courses', null, {});

//     // await queryInterface.bulkDelete('coursetype_items', null, {});
//     // await queryInterface.bulkDelete('coursetypes', null, {});
//     // await queryInterface.bulkDelete('instructors', null, {});
//     // await queryInterface.bulkDelete('credits', null, {});
//     await queryInterface.bulkDelete('students', null, {});

//     await queryInterface.bulkDelete('parents', null, {});
//     await queryInterface.bulkDelete('employments', null, {});
//     await queryInterface.bulkDelete('items', null, {});
//     await queryInterface.bulkDelete('users', null, {});
//   },
// };
