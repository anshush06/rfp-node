class VendorCategoryMappingModel {

  static async getVendorsByCategory(categoryId, conn) {
    const sql = `
      SELECT 
        v.id,
        v.firstname,
        v.lastname
      FROM vendors v
      INNER JOIN vendors_categories_mapping vcm 
        ON vcm.vendor_id = v.id
      WHERE vcm.category_id = ?
        AND v.status = 1
    `;

    const [rows] = await conn.execute(sql, [categoryId]);
    return rows;
  }

  static async insertMapping(data, conn) {
    // here we need to insert all the mappings for the vendor and categories
    const sql = `
      INSERT INTO vendors_categories_mapping (category_id, vendor_id)
      VALUES (?, ?)
    `;
    const [result] = await conn.execute(sql, [
      data.category_id,
      data.vendor_id
    ]);
    return result.insertId;
  }
}

module.exports = VendorCategoryMappingModel;
