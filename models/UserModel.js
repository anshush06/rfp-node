class UserModel {

  static async getUserByEmail(email, conn) {
    try {
      const sql = `SELECT * FROM users WHERE email = ?`;
      const [rows] = await conn.execute(sql, [email]);
      return rows.length ? rows[0] : null;
    } catch (error) {
      throw error;
    }
  }

  static async insertUser(data, conn) {
    try {
      const sql = `
        INSERT INTO users (firstname, lastname, email, password)
        VALUES (?, ?, ?, ?)
      `;
      const [result] = await conn.execute(sql, [
        data.firstName,
        data.lastName,
        data.email,
        data.password
      ]);
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserModel;
