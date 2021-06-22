const parse = require('csv-parse');
const fs = require('fs');

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

for (let i = 0; i < csvArrays.length; i += 1) {
  fs.createReadStream(`${__dirname}/${csvFileNames[i]}.csv`)
    .pipe(
      parse({
        delimiter: ',',
      }),
    )
    .on('data', (dataRow) => {
      csvArrays[i].push(dataRow);
    })
    .on('end', () => {
      console.log(csvArrays[i]);
    });
}

module.exports = {
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
  csvAssignments,
};
