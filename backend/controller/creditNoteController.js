const dbconnect = require('../dbconnect')

const getCreditNote = async(req, res)=>{
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    try {
        const sqlcommand =`
            SELECT 
                arsalescreditnote_tbl.salescreditnoteid, 
                arsalescreditnote_tbl.salescreditnoteuserid_processed, 
                arsalescreditnote_tbl.customerid, 
                arsalescreditnote_tbl.refid, 
                arsalescreditnote_tbl.personnelid_sales, 
                arsalescreditnote_tbl.st_processed, 
                arsalescreditnote_tbl.st_processedcanceled, 
                arsalescreditnoteitem_tbl.itemnumber, 
                arsalescreditnoteitem_tbl.sourcerefid, 
                arsalescreditnoteitem_tbl.quantity, 
                arsalescreditnoteitem_tbl.unitsize, 
                arsalescreditnoteitem_tbl.agquantity, 
                arsalescreditnoteitem_tbl.unitprice, 
                arsalescreditnoteitem_tbl.amount, 
                arsalescreditnoteitem_tbl.amountwithtax, 
                arsalescreditnoteitem_tbl.sourcerefid_matunitid,
                arsalescreditnoteitem_tbl.sourcerefid_docuserid
            FROM 
                public.arsalescreditnote_tbl 
            JOIN 
                public.arsalescreditnoteitem_tbl 
            ON 
                arsalescreditnote_tbl.salescreditnoteid = arsalescreditnoteitem_tbl.salescreditnoteid 
            WHERE 
                arsalescreditnote_tbl.st_processed >= $1 
                AND arsalescreditnote_tbl.st_processed <= $2;
            `;
            dbconnect(sqlcommand, [startDate, endDate], (err, result)=>{
                if(err){
                    res.status(500).json({
                        success: false,
                        msg: "There error due to database connection",
                        data: err
                    })
                }else{
                    res.status(200).json({
                        success: true,
                        msg: "Query credit note success"
                    })
                }
            })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "There error due to database connection",
            data: error
        })
    }
}

module.exports ={
    getCreditNote
}