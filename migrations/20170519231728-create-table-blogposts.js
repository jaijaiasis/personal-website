'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('blogposts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      title: {
          type: Sequelize.STRING,
          allowNull: false
      },
      body: {
          type: Sequelize.STRING,
          allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
  });
},

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('blogposts')
  }
};
