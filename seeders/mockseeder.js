// // import jsSha from 'jssha';
// const jsSha = require('jssha');

// const hash = (input) => {
//   const shaObj = new jsSha('SHA-512', 'TEXT', { encoding: 'UTF8' });
//   const unhashedString = `${input}`;
//   shaObj.update(unhashedString);
//   return shaObj.getHash('HEX');
// };
// module.exports = {
//   up: async (queryInterface) => {
//     try {
//     // Seed users
//       const seedUsers = [
//         {
//           name: 'userA', mobile: 99999999, email: 'userA@gmail.com', password: hash('qwerty'), is_admin: false, is_parent: true, created_at: new Date(), updated_at: new Date(),
//         },
//         {
//           name: 'userB', mobile: 98888888, email: 'userB@gmail.com', password: hash('qwerty'), is_admin: false, is_parent: true, created_at: new Date(), updated_at: new Date(),
//         },
//         {
//           name: 'userC', mobile: 97777777, email: 'userC@gmail.com', password: hash('qwerty'), is_admin: false, is_parent: true, created_at: new Date(), updated_at: new Date(),
//         },
//         {
//           name: 'userD', mobile: 96666666, email: 'userD@gmail.com', password: hash('qwerty'), is_admin: false, is_parent: false, created_at: new Date(), updated_at: new Date(),
//         },
//         {
//           name: 'userE', mobile: 95555555, email: 'userE@gmail.com', password: hash('qwerty'), is_admin: true, is_parent: false, created_at: new Date(), updated_at: new Date(),
//         },
//       ];
//       const [userA, userB, userC, userD, userE] = await queryInterface.bulkInsert('users', seedUsers, { returning: true });
//       // Seed items
//       const seedItems = [
//         {
//           name: '1-session package', credit_count: 1, price: 110, validity: 24, created_at: new Date(), updated_at: new Date(),
//         },
//         {
//           name: '4-session package', credit_count: 4, price: 380, validity: 24, created_at: new Date(), updated_at: new Date(),
//         },
//         {
//           name: '8-session package', credit_count: 8, price: 700, validity: 24, created_at: new Date(), updated_at: new Date(),
//         },
//         {
//           name: '24-session package', credit_count: 24, price: 1980, validity: 24, created_at: new Date(), updated_at: new Date(),
//         },
//         {
//           name: 'WeDo package', credit_count: 4, price: 300, validity: 24, created_at: new Date(), updated_at: new Date(),
//         },
//         {
//           name: 'Generic Proficiency Test', credit_count: 1, price: 50, validity: 24, created_at: new Date(), updated_at: new Date(),
//         },
//       ];
//       const seededItemsArr = await queryInterface.bulkInsert('items', seedItems, { returning: true });
//       // seed payschemes
//       const seedEmployment = [
//         {
//           type: 'Part time', name: 'Shadow', rate: 5, created_at: new Date(), updated_at: new Date(),
//         },
//         {
//           type: 'Part time', name: 'Event', rate: 10, created_at: new Date(), updated_at: new Date(),
//         },
//         {
//           type: 'Part time', name: 'Assistant Trainer 1', rate: 13, created_at: new Date(), updated_at: new Date(),
//         },
//         {
//           type: 'Part time', name: 'Assistant Trainer 2', rate: 17, created_at: new Date(), updated_at: new Date(),
//         },
//         {
//           type: 'Part time', name: 'Main Trainer 1', rate: 23, created_at: new Date(), updated_at: new Date(),
//         },
//         {
//           type: 'Part time', name: 'Main Trainer 2', rate: 27, created_at: new Date(), updated_at: new Date(),
//         },
//         {
//           type: 'Part time', name: 'Senior Main', rate: 32, created_at: new Date(), updated_at: new Date(),
//         },
//         {
//           type: 'Full time', name: 'Full Time', rate: 62, created_at: new Date(), updated_at: new Date(),
//         },
//       ];
//       const seededEmployment = await queryInterface.bulkInsert('employments', seedEmployment, { returning: true });
//       const [ptA, ptE, ptAT1, ptAT2, ptMT1, ptMT2, ptSM, ftM] = seededEmployment;
//       // seed parent data
//       const seedParents = [
//         {
//           address: '1 Street A', postal_code: '123456', user_id: userA.id, created_at: new Date(), updated_at: new Date(),
//         },
//         {
//           address: '1 Street B', postal_code: '123456', user_id: userB.id, created_at: new Date(), updated_at: new Date(),
//         },
//         {
//           address: '1 Street C', postal_code: '123456', user_id: userC.id, created_at: new Date(), updated_at: new Date(),
//         },
//       ];
//       const [parentA, parentB, parentC] = await queryInterface.bulkInsert('parents', seedParents, { returning: true });
//       // seed student data
//       const seedStudents = [
//         {
//           name: 'Child A', dob: new Date('2008/1/1'), additional_info: '', parent_id: userA.id, created_at: new Date(), updated_at: new Date(),
//         },
//         {
//           name: 'Child B1', dob: new Date('2011/1/1'), additional_info: 'Likes oreos', parent_id: userB.id, created_at: new Date(), updated_at: new Date(),
//         },
//         {
//           name: 'Child B2', dob: new Date('2014/1/1'), additional_info: '', parent_id: userB.id, created_at: new Date(), updated_at: new Date(),
//         },
//         {
//           name: 'Child C', dob: new Date('2011/1/1'), additional_info: '', parent_id: userC.id, created_at: new Date(), updated_at: new Date(),
//         },
//       ];
//       const [childA, childB1, childB2, childC] = await queryInterface.bulkInsert('students', seedStudents, { returning: true });
//       // seed credits data
//       const seedCredits = [
//         {
//           code: 'A0001', parent_id: parentA.id, value: 700, credit_total: 8, purchase_date: new Date('2019/07/30'), expiry: new Date('2021/07/30'), item_id: 3, created_at: new Date(), updated_at: new Date(),
//         },
//         {
//           code: 'A0002', parent_id: parentA.id, value: 380, credit_total: 4, purchase_date: new Date('2019/08/10'), expiry: new Date('2021/08/10'), item_id: 2, created_at: new Date(), updated_at: new Date(),
//         },
//         {
//           code: 'A0003', parent_id: parentA.id, value: 700, credit_total: 8, purchase_date: new Date('2019/12/31'), expiry: new Date('2021/12/31'), item_id: 3, created_at: new Date(), updated_at: new Date(),
//         },
//         {
//           code: 'A0004', parent_id: parentA.id, value: 380, credit_total: 4, purchase_date: new Date('2019/12/31'), expiry: new Date('2021/12/31'), item_id: 2, created_at: new Date(), updated_at: new Date(),
//         },
//         {
//           code: 'B0001', parent_id: parentB.id, value: 380, credit_total: 4, purchase_date: new Date('2019/06/30'), expiry: new Date('2021/06/30'), item_id: 2, created_at: new Date(), updated_at: new Date(),
//         },
//         {
//           code: 'B0002', parent_id: parentB.id, value: 380, credit_total: 4, purchase_date: new Date('2021/12/31'), expiry: new Date('2021/12/31'), item_id: 2, created_at: new Date(), updated_at: new Date(),
//         },
//         {
//           code: 'B0003', parent_id: parentB.id, value: 1980, credit_total: 24, purchase_date: new Date('2020/06/01'), expiry: new Date('2022/06/01'), item_id: 4, created_at: new Date(), updated_at: new Date(),
//         },
//         {
//           code: 'B0004', parent_id: parentB.id, value: 380, credit_total: 8, purchase_date: new Date('2020/06/01'), expiry: new Date('2022/06/01'), item_id: 3, created_at: new Date(), updated_at: new Date(),
//         },
//         {
//           code: 'B0005', parent_id: parentB.id, value: 380, credit_total: 8, purchase_date: new Date('2020/06/01'), expiry: new Date('2022/06/01'), item_id: 3, created_at: new Date(), updated_at: new Date(),
//         },
//         {
//           code: 'B0006', parent_id: parentB.id, value: 300, credit_total: 4, purchase_date: new Date('2020/06/01'), expiry: new Date('2022/06/01'), item_id: 5, created_at: new Date(), updated_at: new Date(),
//         },
//         {
//           code: 'B0007', parent_id: parentB.id, value: 300, credit_total: 4, purchase_date: new Date('2020/06/01'), expiry: new Date('2022/06/01'), item_id: 5, created_at: new Date(), updated_at: new Date(),
//         },
//         {
//           code: 'B0008', parent_id: parentB.id, value: 300, credit_total: 4, purchase_date: new Date('2022/06/01'), expiry: new Date('2022/06/01'), item_id: 5, created_at: new Date(), updated_at: new Date(),
//         },
//         {
//           code: 'C0001', parent_id: parentC.id, value: 1980, credit_total: 24, purchase_date: new Date('2019/10/01'), expiry: new Date('2021/10/01'), item_id: 4, created_at: new Date(), updated_at: new Date(),
//         },
//         {
//           code: 'C0002', parent_id: parentC.id, value: 380, credit_total: 8, purchase_date: new Date('2019/12/31'), expiry: new Date('2021/12/31'), item_id: 3, created_at: new Date(), updated_at: new Date(),
//         },
//       ];
//       const seededCredits = await queryInterface.bulkInsert('credits', seedCredits, { returning: true });
//       // seed instructor data (2)
//       const seedInstructors = [
//         {
//           user_id: userD.id, rate_id: ptAT1.id, created_at: new Date(), updated_at: new Date(),
//         },
//         {
//           user_id: userE.id, rate_id: ftM.id, created_at: new Date(), updated_at: new Date(),
//         },
//       ];
//       const seededInstructorsArr = await queryInterface.bulkInsert('instructors', seedInstructors, { returning: true });
//       // seed course_types data
//       const seedCourseTypes = [];
//       const EV3Levels = ['Beginner Level 1', 'Beginner Level 2', 'Intermediate Level 1', 'Intermediate Level 2', 'Advanced Level 1', 'Advanced Level 2', 'Competition Training'];
//       const ArduinoLevels = ['Introduction', 'Beginner Level 1', 'Beginner Level 2', 'Intermediate Level 1', 'Intermediate Level 2', 'CATALYST'];
//       const WeDoLevels = ['Animals', 'Creepy Crawlies', 'Environment', 'Dinosaurs', 'Machinery', 'Nature', 'Robots', 'Star Wars', 'Hand Tools', 'Vehicles', 'Festivity', 'Transportation'];
//       const PythonLevels = ['Beginner Level 1', 'Beginner Level 2', 'Beginner Level 3', 'Intermediate Level 1', 'Intermediate Level 2', 'Intermediate Level 3', 'Advanced Level 1', 'Advanced Level 2'];
//       const ScratchLevels = ['Tier 1 - Classic Arcade', 'Tier 1 - Animal Planet', 'Tier 1 - Food Hunt', 'Tier 2 - Arcade', 'Tier 2 - Reaction Speed', 'Tier 2 - Sports & Racing'];
//       const learningPathsName = ['WeDo', 'EV3', 'Arduino', 'Python', 'Scratch'];
//       const learningPathsArr = [WeDoLevels, EV3Levels, ArduinoLevels, PythonLevels, ScratchLevels];
//       for (let i = 0; i < learningPathsName.length; i += 1) {
//         const currArray = learningPathsArr[i];
//         for (let j = 0; j < currArray.length; j += 1) {
//           let order;
//           if (learningPathsName[i] === 'WeDo') {
//             order = 0;
//           } else if (learningPathsName[i] === 'Scratch') {
//             order = Math.floor(j / 3) + 1;
//           } else {
//             order = j + 1;
//           }
//           seedCourseTypes.push({
//             learning_pathway: learningPathsName[i],
//             level: currArray[j],
//             order,
//             created_at: new Date(),
//             updated_at: new Date(),
//           });
//         }
//       }
//       const seededCoursetype = await queryInterface.bulkInsert('coursetypes', seedCourseTypes, { returning: true });
//       // seed coursetypes_items
//       const seedCoursetypesItems = [];
//       for (let i = 0; i < seededCoursetype.length; i += 1) {
//         if (seededCoursetype[i].learning_pathway === 'WeDo') {
//           seedCoursetypesItems.push({
//             coursetype_id: seededCoursetype[i].id,
//             item_id: seededItemsArr[4].id,
//             created_at: new Date(),
//             updated_at: new Date(),
//           });
//         } else {
//           for (let j = 0; j < 4; j += 1) {
//             seedCoursetypesItems.push({
//               coursetype_id: seededCoursetype[i].id,
//               item_id: seededItemsArr[j].id,
//               created_at: new Date(),
//               updated_at: new Date(),
//             });
//           }
//         }
//       }
//       await queryInterface.bulkInsert('coursetype_items', seedCoursetypesItems);
//       // seed courses
//       // seed sessions
//       const cDates = [
//         { month: 6, days: [14, 15, 16, 17] },
//         { month: 6, days: [21, 22, 23, 24] },
//         { month: 6, days: [5, 12, 19, 26] },
//         { month: 7, days: [5, 6, 7, 8] },
//         { month: 7, days: [12, 13, 14, 15] },
//         { month: 7, days: [19, 20, 21, 22] },
//       ];
//       const cTimes = [
//         { hour: [9, 12], min: [30, 0] },
//         { hour: [13, 15], min: [0, 30] },
//         { hour: [16, 18], min: [0, 30] },
//       ];
//       const seedCourses = [];
//       const seedSessions = [];
//       for (let i = 0; i < cDates.length; i += 1) {
//       // pick a random time (out of 3)
//         const randTime = Math.floor(Math.random() * cTimes.length);
//         const timeHour = cTimes[randTime].hour;
//         const timeMin = cTimes[randTime].min;
//         const randCourseType = seededCoursetype[Math.floor(Math.random() * seededCoursetype.length)];

//         //  add course
//         const instructorOption = i % 2;
//         const instructorArrOptions = [{ id: 1, name: 'UserD' }, { id: 2, name: 'UserE' }];
//         seedCourses.push({
//           name: `${randCourseType.learning_pathway} ${randCourseType.level}`,
//           start_datetime: new Date(2020, cDates[i].month, cDates[i].days[0], timeHour[0], timeMin[0], 0, 0),
//           end_datetime: new Date(2020, cDates[i].month, cDates[i].days[3], timeHour[1], timeMin[1], 0, 0),
//           location: 'WEST',
//           instructor: JSON.stringify({ instructor: [instructorArrOptions[instructorOption]] }),
//           notes: JSON.stringify({ notes: [] }),
//           limit: 5,
//           coursetype_id: randCourseType.id,
//           updated_at: new Date(),
//           created_at: new Date(),
//         });
//         // add four sessions for each course
//         for (let j = 0; j < 4; j += 1) {
//           seedSessions.push({
//             start_datetime: new Date(2020, cDates[i].month, cDates[i].days[j], timeHour[0], timeMin[0], 0, 0),
//             end_datetime: new Date(2020, cDates[i].month, cDates[i].days[j], timeHour[1], timeMin[1], 0, 0),
//             comments: '',
//             location: 'WEST',
//             instructor: JSON.stringify({ instructor: [instructorArrOptions[instructorOption]] }),
//             notes: JSON.stringify({ notes: [] }),
//             limit: 5,
//             is_chargeable: true,
//             course_id: i + 1,
//             session_type: null,
//             created_at: new Date(),
//             updated_at: new Date(),
//           });
//         }
//       }
//       const seededCourses = await queryInterface.bulkInsert('courses', seedCourses, { returning: true });
//       const seededSessions = await queryInterface.bulkInsert('sessions', seedSessions, { returning: true });

//       // seed assignments
//       const seedAssignments = [];
//       for (let i = 0; i < seededSessions.length; i += 1) {
//         const instructorId = Math.floor(i / 4) % 2;
//         seedAssignments.push({
//           session_id: seededSessions[i].id,
//           instructor_id: seededInstructorsArr[instructorId].id,
//           rate: seededEmployment[seededInstructorsArr[instructorId].rate_id - 1].rate,
//           role: 'main',
//           created_at: new Date(),
//           updated_at: new Date(),
//         });
//       }
//       await queryInterface.bulkInsert('assignments', seedAssignments);
//     } catch (error) {
//       console.log('-----------error message-------------');
//       console.log(error);
//     }
//   },

//   down: async (queryInterface) => {
//     await queryInterface.bulkDelete('assignments', null, {});
//     await queryInterface.bulkDelete('sessions', null, {});
//     await queryInterface.bulkDelete('courses', null, {});
//     await queryInterface.bulkDelete('coursetype_items', null, {});
//     await queryInterface.bulkDelete('coursetypes', null, {});
//     await queryInterface.bulkDelete('instructors', null, {});
//     await queryInterface.bulkDelete('credits', null, {});
//     await queryInterface.bulkDelete('students', null, {});
//     await queryInterface.bulkDelete('parents', null, {});
//     await queryInterface.bulkDelete('employment', null, {});
//     await queryInterface.bulkDelete('items', null, {});
//     await queryInterface.bulkDelete('users', null, {});
//   },
// };
