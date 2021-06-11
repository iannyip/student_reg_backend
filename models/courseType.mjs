export default function initCourseTypeModel(sequelize, DataTypes) {
  return sequelize.define(
    'courseType',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      learningPathway: {
        type: DataTypes.STRING,
      },
      level: {
        type: DataTypes.STRING,
      },
      order: {
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