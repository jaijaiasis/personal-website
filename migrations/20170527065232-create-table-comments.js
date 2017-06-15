'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('comments', {
      comment_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
      },
      name: {
          type: Sequelize.STRING,
          defaultValue: 'Anonymous'
      },
      email: {
          type: Sequelize.STRING,
          defaultValue: null
      },
      website: {
          type: Sequelize.STRING,
          defaultValue: null
      },
      body: {
          type: Sequelize.STRING,
          defaultValue: null
      },
      blog_id: {
          type: Sequelize.INTEGER,
          references: {
              model: 'blogposts',
              key: 'id'
          }
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
    queryInterface.dropTable('comments')
  }
};
