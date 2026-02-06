class VendorCategoryMappingModel {

  static async getVendorsByCategory(vendorID, conn) {
    const sql = `SELECT id, category_name FROM vendors_categories_mapping WHERE vendor_id = ?`;
    const [rows] = await conn.execute(sql, [vendorID]);
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
