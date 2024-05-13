const { Pool } = require('pg');
const config = require('../../../Commons/config');

const pool = process.env.NODE_ENV === 'test' ? new Pool(config.testDatabase) : new Pool(config.database);

module.exports = pool;
