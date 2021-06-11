'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const seedUsers = [
      {name: 'userA',mobile: 99999999, email: 'userA@gmail.com', password: 'qwerty', is_admin: false, is_parent: true, created_at=new Date(), updated_at: new Date()},
      {name: 'userB',mobile: 98888888, email: 'userB@gmail.com', password: 'qwerty', is_admin: false, is_parent: true, created_at=new Date(), updated_at: new Date()},
      {name: 'userC',mobile: 97777777, email: 'userC@gmail.com', password: 'qwerty', is_admin: false, is_parent: true, created_at=new Date(), updated_at: new Date()},
      {name: 'userD',mobile: 96666666, email: 'userD@gmail.com', password: 'qwerty', is_admin: false, is_parent: true, created_at=new Date(), updated_at: new Date()},
      {name: 'userE',mobile: 95555555, email: 'userE@gmail.com', password: 'qwerty', is_admin: false, is_parent: true, created_at=new Date(), updated_at: new Date()},
    ];
    const seedItems = [
      {name: '1-session package', credit_count: 1, price: 110, created_at=new Date(), updated_at: new Date()},
      {name: '4-session package', credit_count: 4, price: 380, created_at=new Date(), updated_at: new Date()},
      {name: '8-session package', credit_count: 8, price: 700, created_at=new Date(), updated_at: new Date()},
      {name: '24-session package', credit_count: 24, price: 1980, created_at=new Date(), updated_at: new Date()},
      {name: 'WeDo package', credit_count: 4, price: 300, created_at=new Date(), updated_at: new Date()},
      {name: 'Generic Proficiency Test', credit_count: 1, price: 50, created_at=new Date(), updated_at: new Date()},
    ];
    const seedPaySchemes = [
      {name: 'Shadow', rate: 5, created_at=new Date(), updated_at: new Date()},
      {name: 'Event', rate: 10, created_at=new Date(), updated_at: new Date()},
      {name: 'Assistant Trainer 1', rate: 13, created_at=new Date(), updated_at: new Date()},
      {name: 'Assistant Trainer 2', rate: 17, created_at=new Date(), updated_at: new Date()},
      {name: 'Main Trainer 1', rate: 23, created_at=new Date(), updated_at: new Date()},
      {name: 'Main Trainer 2', rate: 27, created_at=new Date(), updated_at: new Date()},
      {name: 'Senior Main', rate: 32, created_at=new Date(), updated_at: new Date()},
      {name: 'Full Time', rate: 62, created_at=new Date(), updated_at: new Date()},
    ];
    const seedParents = [
       {address: '1 Street A', postal_code: '123456', user_id: 1, created_at=new Date(), updated_at: new Date()},
       {address: '1 Street B', postal_code: '123456', user_id: 2, created_at=new Date(), updated_at: new Date()},
       {address: '1 Street C', postal_code: '123456', user_id: 3, created_at=new Date(), updated_at: new Date()},
    ];
    const seedStudents = [
       {name: 'Child A', dob: new Date('2008/1/1'), additional_info: '', parent_id: 1, created_at=new Date(), updated_at: new Date()},
       {name: 'Child B1', dob: new Date('2011/1/1'), additional_info: '', parent_id: 1, created_at=new Date(), updated_at: new Date()},
       {name: 'Child B2', dob: new Date('2014/1/1'), additional_info: '', parent_id: 1, created_at=new Date(), updated_at: new Date()},
       {name: 'Child A', dob: new Date('2011/1/1'), additional_info: '', parent_id: 1, created_at=new Date(), updated_at: new Date()},
    ];
    const seedCredits = [
      {code: 'A0001', parent_id: 1, value: 700, credit_total: 8, expiry: new Date('2021/07/30'), item_id: 3, created_at: new Date(), updated_at: new Date()},
      {code: 'A0002', parent_id: 1, value: 380, credit_total: 4, expiry: new Date('2021/08/10'), item_id: 2, created_at: new Date(), updated_at: new Date()},
      {code: 'A0003', parent_id: 1, value: 700, credit_total: 8, expiry: new Date('2021/12/31'), item_id: 3, created_at: new Date(), updated_at: new Date()},
      {code: 'A0004', parent_id: 1, value: 380, credit_total: 4, expiry: new Date('2021/12/31'), item_id: 2, created_at: new Date(), updated_at: new Date()},
      {code: 'B0001', parent_id: 2, value: 380, credit_total: 4, expiry: new Date('2021/06/30'), item_id: 2, created_at: new Date(), updated_at: new Date()},
      {code: 'B0002', parent_id: 2, value: 380, credit_total: 4, expiry: new Date('2021/12/31'), item_id: 2, created_at: new Date(), updated_at: new Date()},
      {code: 'B0003', parent_id: 2, value: 1980, credit_total: 24, expiry: new Date('2022/06/01'), item_id: 4, created_at: new Date(), updated_at: new Date()},
      {code: 'B0004', parent_id: 2, value: 380, credit_total: 8, expiry: new Date('2022/06/01'), item_id: 3, created_at: new Date(), updated_at: new Date()},
      {code: 'B0005', parent_id: 2, value: 380, credit_total: 8, expiry: new Date('2022/06/01'), item_id: 3, created_at: new Date(), updated_at: new Date()},
      {code: 'B0006', parent_id: 2, value: 300, credit_total: 4, expiry: new Date('2022/06/01'), item_id: 5, created_at: new Date(), updated_at: new Date()},
      {code: 'B0007', parent_id: 2, value: 300, credit_total: 4, expiry: new Date('2022/06/01'), item_id: 5, created_at: new Date(), updated_at: new Date()},
      {code: 'B0008', parent_id: 2, value: 300, credit_total: 4, expiry: new Date('2022/06/01'), item_id: 5, created_at: new Date(), updated_at: new Date()},
      {code: 'C0001', parent_id: 3, value: 1980, credit_total: 24, expiry: new Date('2021/10/01'), item_id: 4, created_at: new Date(), updated_at: new Date()},
      {code: 'C0002', parent_id: 3, value: 380, credit_total: 8, expiry: new Date('2021/12/31'), item_id: 3, created_at: new Date(), updated_at: new Date()},
    ];
    const seedInstructors = [
      {employment: 'Full Time',user_id: 4, rate_id: 8, created_at: new Date(), updated_at: new Date()},
      {employment: 'Part Time',user_id: 5, rate_id: 3, created_at: new Date(), updated_at: new Date()},
    ];
    const seedCourseTypes = [];
    const EV3Levels = ['Beginner Level 1', 'Beginner Level 2', 'Intermediate Level 1', 'Intermediate Level 2', 'Advanced Level 1', 'Advanced Level 2', 'Competition Training'];
    const ArduinoLevels = ['Introduction', 'Beginner Level 1', 'Beginner Level 2', 'Intermediate Level 1', 'Intermediate Level 2', 'CATALYST'];
    const WeDoLevels = ['Animals', 'Creepy Crawlies', 'Environment', 'Dinosaurs', 'Machinery', 'Nature', 'Robots', 'Star Wars', 'Hand Tools', 'Vehicles', 'Festivity', 'Transportation'];
    const PythonLevels = ['Beginner Level 1', 'Beginner Level 2','Beginner Level 3', 'Intermediate Level 1', 'Intermediate Level 2', 'Intermediate Level 3', 'Advanced Level 1', 'Advanced Level 2'];
    const ScratchLevels = ['Tier 1 - Classic Arcade', 'Tier 1 - Animal Planet', 'Tier 1 - Food Hunt', 'Tier 2 - Arcade', 'Tier 2 - Reaction Speed', 'Tier 2 - Sports & Racing'];
    const learningPathsName = ['EV3', 'Arduino', 'WeDo', 'Python', 'Scratch']
    const learningPathsArr = [EV3Levels, ArduinoLevels, WeDoLevels, PythonLevels, ScratchLevels]
    for (let i = 0; i < learningPathsName.length; i += 1){
      const currArray = learningPathsArr[i];
      for (let j = 0; j < currArray.length; j += 1){
        let order;
        if (learningPathsName[i] === 'WeDo'){
          order = 0;
        } else if (learningPathsName[i] === 'Scratch') {
          order = Math.floor(j / 3) + 1;
        } else {
          order = j + 1;
        }
        seedCourseTypes.push({
          learning_pathway: learningPathsName[i],
          level: currArray[j],
          order,
          item_id: 1,
          created_at: new Date(), 
          updated_at: new Date(),
        });
      }
    }

    

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
