export default function initAttendanceModel(sequelize, DataTypes) {
  return sequelize.define(
    'attendance',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      sessionId: {
        type: DataTypes.INTEGER,
        references:{
          model: 'sessions',
          key: 'id',
        }
      },
      studentId: {
        type: DataTypes.INTEGER,
        references:{
          model: 'students',
          key: 'id',
        }
      },
      comments: {
        type: DataTypes.STRING,
      },
      marked: {
        type: DataTypes.STRING,
      },
      payment: {
        type: DataTypes.INTEGER,
        references:{
          model: 'course_packages',
          key: 'id',
        }
      },
      status: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      underscored: true,
    }
  );
};