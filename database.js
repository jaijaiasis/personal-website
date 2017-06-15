const Sequelize = require('sequelize');

const connectionUrl = 'postgres://jaijaiasis:admin@localhost:5432/webeng-jaijaiasis';
const database = new Sequelize(connectionUrl);

module.exports = database;
