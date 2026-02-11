class RfpVendorMapping {
    static async insertMapping(rfpId, vendorId, conn) {
        try {
            const sql = `
        INSERT INTO rfps_vendors_mapping (rfp_id, vendor_id)
        VALUES (?, ?)
      `;
            const [result] = await conn.execute(sql, [rfpId, vendorId]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    static async getVendorsByRfp(rfpId, conn) {
        try {
            const sql = `
        SELECT v.* 
        FROM vendors v
        INNER JOIN rfps_vendors_mapping rvm ON v.id = rvm.vendor_id
        WHERE rvm.rfp_id = ?
      `;
            const [rows] = await conn.execute(sql, [rfpId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = RfpVendorMapping;
