const parse = require('csv-parse');
const fs = require('fs');

const translateCSV = async (file, arr) => {
  try {
    await fs.createReadStream(`${__dirname}/${file}.csv`)
      .pipe(
        parse({
          delimiter: ',',
        }),
      )
      .on('data', (dataRow) => {
        arr.push(dataRow);
      })
      .on('end', () => {
        console.log(file, ': ', arr.length);
      });
  } catch (error) {
    console.log(error);
  }
};

const readCsvFn = async () => {
  try {
    const csvUsers = [];
    const csvItems = [];
    const csvEmployments = [];
    const csvParents = [];
    const csvStudents = [];

    const csvCredits = [];
    const csvInstructors = [];
    const csvCoursetypes = [];
    const csvCoursetypeItems = [];
    const csvCourses = [];

    const csvSessions = [];
    const csvSignups = [];
    const csvAttendances = [];
    const csvAssignments = [];

    const csvArrays = [
      csvUsers,
      csvItems,
      csvEmployments,
      csvParents,
      csvStudents,

      csvCredits,
      csvInstructors,
      csvCoursetypes,
      csvCoursetypeItems,
      csvCourses,

      csvSessions,
      csvSignups,
      csvAttendances,
      csvAssignments];

    const csvFileNames = ['USERS', 'ITEMS', 'EMPLOYMENTS', 'PARENTS', 'STUDENTS', 'CREDITS', 'INSTRUCTORS', 'COURSETYPES', 'COURSETYPES_ITEMS', 'COURSES', 'SESSIONS', 'SIGNUPS', 'ATTENDANCES', 'ASSIGNMENTS'];

    // csvFileNames.forEach(async (file) => {
    //   const i = csvFileNames.indexOf(file);
    //   await translateCSV(file, csvArrays[i]);
    //   if (i === csvFileNames.length - 1) {
    //     console.log('done');
    //   }
    // });
    console.log('before MARKER');
    await translateCSV(csvFileNames[0], csvArrays[0]);
    await translateCSV(csvFileNames[1], csvArrays[1]);
    console.log('after MARKER');

    for (let i = 0; i < csvArrays.length - 12; i += 1) {
      console.log('please print after:', csvArrays[i].length);
    }

    // return {
    //   csvUsers,
    //   csvItems,
    //   csvEmployments,
    //   csvParents,
    //   csvStudents,

    //   csvCredits,
    //   csvInstructors,
    //   csvCoursetypes,
    //   csvCoursetypeItems,
    //   csvCourses,

    //   csvSessions,
    //   csvSignups,
    //   csvAttendances,
    //   csvAssignments,
    // };
  } catch (error) {
    console.log(error);
  }
};

module.exports = readCsvFn();

// const csvUsers = [];
// const csvItems = [];
// const csvEmployments = [];
// const csvParents = [];
// const csvStudents = [];

// const csvCredits = [];
// const csvInstructors = [];
// const csvCoursetypes = [];
// const csvCoursetypeItems = [];
// const csvCourses = [];

// const csvSessions = [];
// const csvSignups = [];
// const csvAttendances = [];
// const csvAssignments = [];

// const csvArrays = [
//   csvUsers,
//   csvItems,
//   csvEmployments,
//   csvParents,
//   csvStudents,

//   csvCredits,
//   csvInstructors,
//   csvCoursetypes,
//   csvCoursetypeItems,
//   csvCourses,

//   csvSessions,
//   csvSignups,
//   csvAttendances,
//   csvAssignments];

// const csvFileNames = ['USERS', 'ITEMS', 'EMPLOYMENTS', 'PARENTS', 'STUDENTS', 'CREDITS', 'INSTRUCTORS', 'COURSETYPES', 'COURSETYPES_ITEMS', 'COURSES', 'SESSIONS', 'SIGNUPS', 'ATTENDANCES', 'ASSIGNMENTS'];

// for (let i = 0; i < csvArrays.length; i += 1) {
//   fs.createReadStream(`${__dirname}/${csvFileNames[i]}.csv`)
//     .pipe(
//       parse({
//         delimiter: ',',
//       }),
//     )
//     .on('data', (dataRow) => {
//       csvArrays[i].push(dataRow);
//     })
//     .on('end', () => {
//       // console.log(csvArrays[i]);
//       console.log(csvArrays[i].length);
//     });
// }

// for (let i = 0; i < csvArrays.length; i += 1) {
//   console.log(csvArrays[i].length);
// }

// // console.log(csvUsers[0]);
// // console.log(csvParents[0]);
// // console.log(csvCourses[0]);
// // console.log(csvAttendances[0]);

// module.exports = {
//   csvUsers,
//   csvItems,
//   csvEmployments,
//   csvParents,
//   csvStudents,

//   csvCredits,
//   csvInstructors,
//   csvCoursetypes,
//   csvCoursetypeItems,
//   csvCourses,

//   csvSessions,
//   csvSignups,
//   csvAttendances,
//   csvAssignments,
// };
