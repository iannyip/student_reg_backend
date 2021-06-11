export default function initSignupModel(sequelize, DataTypes) {
  return sequelize.define(
    'signup',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      courseId: {
        type: DataTypes.INTEGER,
        references:{
          model: 'courses',
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