
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('eventapp', 'root', 'eventapp', {
    host: 'localhost',
    dialect: 'mysql' // vagy az adott adatbázis típusa
  });


// Eseménytípusok tábla definíciója
const EventType = sequelize.define('EventType', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true // lehet üres is a tartalom
    }
  });
  
  async function getAllEventTypes() {
    try {
      const eventTypes = await EventType.findAll({
        attributes: ['name'] // Specify the column(s) you want to retrieve
      });
      console.log('Event types:', eventTypes); // Log the eventTypes variable
      return eventTypes;
      return eventTypes;
    } catch (error) {
      console.error('Error retrieving event types:', error);
      throw error;
    }
  }
  

  
  module.exports = { getAllEventTypes };