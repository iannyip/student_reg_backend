'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      mobile: {
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: FALSE,
      },
      isParent: {
        type: Sequelize.BOOLEAN,
        defaultValue: FALSE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.createTable('items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      credit_count: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.createTable('pay_schemes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      rate: {
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.createTable('parents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      address: {
        type: Sequelize.STRING,
      },
      postal_code: {
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'users',
          key: 'id',
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.createTable('students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      dob: {
        type: Sequelize.DATE,
      },
      additional_info: {
        type: Sequelize.STRING,
      },
      parent_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'users',
          key: 'id',
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.createTable('credits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      code: {
        type: Sequelize.STRING,
      },
      parent_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'users',
          key: 'id',
        }
      },
      value: {
        type: Sequelize.INTEGER,
      },
      credit_total: {
        type: Sequelize.INTEGER,
      },
      expiry: {
        type: Sequelize.DATE,
      },
      item_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'items',
          key: 'id',
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.createTable('instructors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      employment: {
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'users',
          key: 'id',
        }
      },
      rate_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'pay_schemes',
          key: 'id',
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    
    await queryInterface.createTable('course_types', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      learning_pathway: {
        type: Sequelize.STRING,
      },
      level: {
        type: Sequelize.STRING,
      },
      order: {
        type: Sequelize.INTEGER,
      },
      item_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'items',
          key: 'id',
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }); 
    await queryInterface.createTable('courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      start_datetime: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      end_datetime: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      location: {
        type: Sequelize.STRING,
      },
      limit: {
        type: Sequelize.INTEGER,
      },
      coursetype_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'coursetypes',
          key: 'id',
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }); 
    await queryInterface.createTable('sessions', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      start_datetime: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      end_datetime: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      instructor: {
        type: Sequelize.STRING,
      },
      comments: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING,
      },
      limit: {
        type: Sequelize.INTEGER,
      },
      course_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'courses',
          key: 'id',
        }
      },
      sessiontype: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }); 

    await queryInterface.createTable('signups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      course_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'courses',
          key: 'id',
        }
      },
      student_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'students',
          key: 'id',
        }
      },
      comments: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }); 
    await queryInterface.createTable('attendance', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      session_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'sessions',
          key: 'id',
        }
      },
      student_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'students',
          key: 'id',
        }
      },
      comments: {
        type: Sequelize.STRING,
      },
      marked: {
        type: Sequelize.STRING,
      },
      payment: {
        type: Sequelize.INTEGER,
        references:{
          model: 'course_packages',
          key: 'id',
        }
      },
      status: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }); 
    await queryInterface.createTable('assignments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      session_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'sessions',
          key: 'id',
        }
      },
      instructor_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'instructors',
          key: 'id',
        }
      },
      rate: {
        type: Sequelize.INTEGER,
      },
      role: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }); 
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('signups');
    await queryInterface.dropTable('attendance');
    await queryInterface.dropTable('assignments');

    await queryInterface.dropTable('sessions');
    await queryInterface.dropTable('courses');
    await queryInterface.dropTable('course_types');
    
    await queryInterface.dropTable('credits');
    await queryInterface.dropTable('students');
    await queryInterface.dropTable('parents');
    await queryInterface.dropTable('instructors');

    await queryInterface.dropTable('pay_schemes');
    await queryInterface.dropTable('items');
    await queryInterface.dropTable('users');

  }
}; 
