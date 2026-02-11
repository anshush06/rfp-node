class RfpQuoteModel {
  static async getRfpQuotesByID(conn, rfpId, page, limit, vendorId = null) {
    try {
        page = Number(page) || 1;
        limit = Number(limit) || 10;
        const offset = (page - 1) * limit;
        let dataSql;
        let countSql;
        let dataParams;
        let countParams;
        if (vendorId) {
            // Vendor-specific quotes
            dataSql = `
                SELECT 
                rq.id,
                rq.rfp_number,
                rq.description,
                rq.quantity,
                rq.itemprice,
                rq.totalcost,
                rq.status,
                rq.date_added
                FROM rfp_quotes rq
                WHERE rq.rfp_id = ?
                AND rq.vendor_id = ?
                ORDER BY rq.date_added DESC
                LIMIT ? OFFSET ?
            `;

            countSql = `
                SELECT COUNT(*) AS total
                FROM rfp_quotes
                WHERE rfp_id = ?
                AND vendor_id = ?
            `;

            dataParams = [rfpId, vendorId, limit, offset];
            countParams = [rfpId, vendorId];

            } else {
            // Admin - all vendor quotes for this RFP
            dataSql = `
                SELECT 
                rq.id,
                rq.rfp_number,
                rq.description,
                rq.quantity,
                rq.itemprice,
                rq.totalcost,
                rq.status,
                rq.date_added,
                v.firstname,
                v.lastname,
                v.email
                FROM rfp_quotes rq
                LEFT JOIN vendors v ON v.id = rq.vendor_id
                WHERE rq.rfp_id = ?
                ORDER BY rq.date_added DESC
                LIMIT ? OFFSET ?
            `;

            countSql = `
                SELECT COUNT(*) AS total
                FROM rfp_quotes
                WHERE rfp_id = ?
            `;
            dataParams = [rfpId, limit, offset];
            countParams = [rfpId];
            }
            const [quotes] = await conn.query(dataSql, dataParams);
            const [[{ total }]] = await conn.query(countSql, countParams);
            return {
            quotes,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            totalQuotes: total
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = RfpQuoteModel;
