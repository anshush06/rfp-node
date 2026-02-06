const pool = require('../config/db');

const getDBConnection = async () => {
  return await pool.getConnection();
}

module.exports = { getDBConnection };