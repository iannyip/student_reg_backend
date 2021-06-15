export default function initCourseModel(sequelize, DataTypes) {
  return sequelize.define(
    'course',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      startDatetime: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      endDatetime: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      location: {
        type: DataTypes.STRING,
      },
      limit: {
        type: DataTypes.INTEGER,
      },
      coursetypeId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'coursetypes',
          key: 'id',
        },
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
    },
  );
}
