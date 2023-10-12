'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const express = require('express');
const sequelize = require('./config/sequelizeConfig'); // Importa la configuración de Sequelize
const Proyecto = require('./models/proyecto'); // Importa el modelo de proyecto

const app = express();

// ... Configuración de Express y rutas ...

// Sincronizar el modelo con la base de datos antes de iniciar el servidor
sequelize.sync()
    .then(() => {
      console.log('Tabla "proyectos" creada en la base de datos.');
      // Iniciar el servidor Express
      app.listen(3000, () => {
        console.log('Servidor en funcionamiento en el puerto 3000.');
      });
    })
    .catch((error) => {
      console.error('Error al crear la tabla "proyectos":', error);
    });

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
