const dbconfig = require('../db')
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD, { 
    host : dbconfig.HOST,
    dialect : dbconfig.dialect,
    operatorsAliases : false,

    pool :{
        max :dbconfig.pool.max,
        min : dbconfig.pool.min,
        acquire : dbconfig.pool.acqire,
        idle : dbconfig.pool.idle
    }
})

const db ={};

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;