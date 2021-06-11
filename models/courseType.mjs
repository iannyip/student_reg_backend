export default function initCoursetypeModel(sequelize, DataTypes) {
  return sequelize.define(
    'coursetype',
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
      item_id: {
        type: DataTypes.INTEGER,
        references:{
          model: 'items',
          key: 'id',
        }
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