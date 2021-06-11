export default function initCoursePackageModel(sequelize, DataTypes) {
  return sequelize.define(
    'coursePackage',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      code: {
        type: DataTypes.STRING,
      },
      parentId: {
        type: DataTypes.INTEGER,
        references:{
          model: 'users',
          key: 'id',
        }
      },
      value: {
        type: DataTypes.INTEGER,
      },
      totalSessions: {
        type: DataTypes.INTEGER,
      },
      sessionsLeft: {
        type: DataTypes.INTEGER,
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