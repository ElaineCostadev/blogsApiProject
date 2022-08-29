'use strict';
module.exports = {
/**
* @param {import('sequelize').QueryInterface} queryInterface
* @param {import('sequelize').Sequelize } Sequelize
*/

// validations Sequelize = https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      displayName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
        
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};


/* validate: {
  // isEmail: true,
  isEmail: {
  msg: 'Please enter your email'
  }
} */