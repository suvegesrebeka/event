// Importing the required libraries
const mysql = require('mysql');
const express = require('express');
const app = express();
const port = 3000;
const { Sequelize, DataTypes } = require('sequelize');


// MySQL connection configuration
const connection = mysql.createConnection({
  host: 'localhost',     
  port: '3306',     
  user: 'root', 
  password: 'eventapp', 
  database: 'eventapp'  
});

// Connecting to MySQL server
connection.connect((err) => {
  if (err) {
    console.error('ERROR connecting to MySQL server: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL server as id ' + connection.threadId);
});


// Closing the connection when done
// connection.end((err) => {
//   if (err) {
//     console.error('Error closing connection: ' + err.stack);
//     return;
//   }
//   console.log('Connection closed successfully.');
// });

//server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});


//ORM

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

// Adatbázis inicializálása és tábla létrehozása
(async () => {
  try {
    await sequelize.authenticate(); // Adatbázis kapcsolat ellenőrzése
    console.log('Adatbázis kapcsolat sikeres.');

    // Tábla létrehozása, ha még nem létezik
    await EventType.sync({ force: true });
    console.log('EventType tábla létrehozva és szinkronizálva.');

    // Néhány eseménytípus hozzáadása
    await EventType.bulkCreate([
      { name: 'restaurant', content: '' },
      { name: 'amusement', content: 'disco, boatparty, dance events' },
      { name: 'curtural', content: 'museum, art' },
      { name: 'sport', content: 'sup,fooball,basketball' },
      { name: 'under age', content: '' },
      { name: 'relaxation', content: 'massage,meditation,selfcare' },
      { name: 'adrenalin', content: 'skydiving, bungee jumping' },
      { name: 'common', content: '' },
      { name: 'DIY', content: 'hand made objects, foods, interractive events' },
      // Itt adhatsz meg további eseménytípusokat
    ]);
    console.log('Eseménytípusok sikeresen hozzáadva.');
  } catch (error) {
    console.error('Hiba történt az adatbázis inicializálása során:', error);
  } finally {
    // Sequelize kapcsolat lezárása
    sequelize.close();
  }
})();
// Teszteld a kapcsolatot
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('ORM works.');
  } catch (error) {
    console.error('ERROR while connecting to the orm :', error);
  }
}

testConnection();
