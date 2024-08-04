export default function initCreditModel(sequelize, DataTypes) {
  return sequelize.define(
    'credit',
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
        references: {
          model: 'users',
          key: 'id',
        },
      },
      value: {
        type: DataTypes.INTEGER,
      },
      creditTotal: {
        type: DataTypes.INTEGER,
      },
      purchaseDate: {
        type: DataTypes.DATE,
      },
      expiry: {
        type: DataTypes.DATE,
      },
      itemId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'items',
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
