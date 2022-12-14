module.exports = (Sequelize, fields = {}) => ({
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
  },
  ...fields,
  created_at: {
    type: Sequelize.DATE,
  },
  updated_at: {
    type: Sequelize.DATE,
  },
  deleted_at: {
    type: Sequelize.DATE,
  },
});
