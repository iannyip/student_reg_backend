import faker from 'faker';
import db from './models/index.mjs';

// SENSITIVE USER DATA (up to user 210 - ian)
// -- name
// -- mobile
// -- email

// SENSITIVE PARENT DATA
// -- address
// -- postal code

// SENSITIVE STUDENT DATA
// -- name

const anonymizeSensitiveData = async () => {
  try {
    console.log('===== Anonymizing data =====');
    const users = await db.User.findAll();
    const parents = await db.Parent.findAll();
    const students = await db.Student.findAll();

    users.forEach(async (user) => {
      await user.update({
        name: faker.name.findName(),
        mobile: faker.phone.phoneNumberFormat(),
        email: faker.internet.email(),
      });
    });

    parents.forEach(async (parent) => {
      await parent.update({
        address: faker.address.streetAddress(),
        postalCode: faker.address.zipCode(),
      });
    });

    students.forEach(async (student) => {
      await student.update({
        name: faker.name.findName(),
      });
    });
  } catch (error) {
    console.log(error);
  }
};

anonymizeSensitiveData();
// heroku run --remote staging node anonymizeData.js
