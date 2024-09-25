const dbconnect = require('../dbconnect')

const dateConfirm = async (req, res) =>{
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    try {
        const sqlcommand = `
        SELECT 
            sasalesorder_tbl.salesorderuserid, 
            sasalesorder_tbl.st_confirmed,
            maentity_tbl.entityuserid,
            maentity_tll.entity_firstname
        FROM 
            public.sasalesorder_tbl
        JOIN 
            maentity_tbl ON sasalesorder_tbl.customerid = maentity_tbl.entityid
        JOIN 
            maentity_tll ON maentity_tbl.entityid = maentity_tll.entityid
        WHERE 
            sasalesorder_tbl.st_confirmed BETWEEN $1 AND $2
            AND sasalesorder_tbl.salesorderuserid LIKE '%SR%'
        GROUP BY 
            sasalesorder_tbl.salesorderuserid, 
            sasalesorder_tbl.st_confirmed,
            maentity_tbl.entityuserid,
            maentity_tll.entity_firstname
        
        `
        dbconnect.query(sqlcommand,[startDate, endDate], (err, result)=>{
            if(err){
                res.status(500).json({
                    success: false,
                    msg: "There error due to database connection",
                    data: err,
                    errorType: "database"
                })
            }else{
                res.status(200).json({
                    success: true,
                    msg: "Sale order confirm date query success",
                    data: result.rows,
                    countlength: result.rows.length,
                })
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "There error due to database connection",
            data: err,
            errorType: "server-connection"
        })
    }
}

module.exports ={
    dateConfirm
}