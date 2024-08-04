export default function initSessionModel(sequelize, DataTypes) {
  return sequelize.define(
    'session',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      startDatetime: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      endDatetime: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      comments: {
        type: DataTypes.STRING,
      },
      location: {
        type: DataTypes.STRING,
      },
      limit: {
        type: DataTypes.INTEGER,
      },
      instructor: {
        type: DataTypes.JSON,
      },
      notes: {
        type: DataTypes.JSON,
      },
      isChargeable: {
        type: DataTypes.BOOLEAN,
      },
      courseId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'courses',
          key: 'id',
        },
      },
      sessionType: {
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
    },
  );
}
