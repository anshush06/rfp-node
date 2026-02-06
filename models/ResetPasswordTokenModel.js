class ResetPasswordTokenModel {

  static async getResetToken(token, conn) {
    try {
        const sql = `
            SELECT user_id, role
            FROM reset_password_tokens
            WHERE token = ?
            AND used = 0
            AND expiry > NOW()
            LIMIT 1
        `;
        const [rows] = await conn.execute(sql, [token]);
        return rows[0] || null;
    } catch (error) {
        throw error
    }
   }
  static async storeResetToken(data, conn) {
    const sql = `
      INSERT INTO reset_password_tokens (user_id, role, token, expiry)
      VALUES (?, ?, ?, ?)
    `;
    await conn.execute(sql, [
      data.user_id,
      data.role,
      data.token,
      data.expiry
    ]);
  }
  static async markTokenUsed(token, conn) {
    const sql = `
        UPDATE reset_password_tokens
        SET used = 1
        WHERE token = ?
    `;
    await conn.execute(sql, [token]);
    }
}

module.exports = ResetPasswordTokenModel;
