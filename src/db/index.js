const Sequelize = require('sequelize');
const sequelize = new Sequelize('aiedu', 'root', 'root', {
    host: '127.0.0.1',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }   
  });   
  
sequelize.authenticate()
    .then(() => {
        sequelize.sync();
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
  
module.exports = sequelize;