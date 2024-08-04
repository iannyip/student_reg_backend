export default function initAssignmentModel(sequelize, DataTypes) {
  return sequelize.define(
    'assignment',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      sessionId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'sessions',
          key: 'id',
        },
      },
      instructorId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'instructors',
          key: 'id',
        },
      },
      rate: {
        type: DataTypes.INTEGER,
      },
      role: {
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
