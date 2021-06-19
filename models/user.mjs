import jsSha from 'jssha';
// const jsSha = require('jssha');

const hasher = (input) => {
  const shaObj = new jsSha('SHA-512', 'TEXT', { encoding: 'UTF8' });
  const unhashedString = `${input}`;
  shaObj.update(unhashedString);
  return shaObj.getHash('HEX');
};

export default function initUserModel(sequelize, DataTypes) {
  return sequelize.define(
    'user',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
      mobile: {
        type: DataTypes.INTEGER,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue('password', hasher(value));
        },
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isParent: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
